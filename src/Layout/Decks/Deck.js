import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import { deleteDeck } from "../../utils/api/index";
import { deleteCard } from "../../utils/api/index";


//const style = { border: "2px solid black", padding: "10px" };

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        if (error.message === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async () => {
    if (window.confirm(`Are you sture you want to delete "${deck.name}"?`)) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const deleteCardHandler = async (card) => {
    if (window.confirm("are you sure you want to delete card?")) {
      await deleteCard(card);
      console.log("DELETED");
      history.go(0);
    }
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>HOME</Link> / {deck.name}
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <button
        className="button button-view"
          type="button"
          onClick={() => history.push(`/decks/${deckId}/edit`)}
        >
          Edit
        </button>
        <button
        className="button button-study"
          type="button"
          onClick={() => history.push(`/decks/${deckId}/study`)}
        >
          Study
        </button>
        <button
        className="button button-view"
          type="button"
          onClick={() => history.push(`/decks/${deckId}/cards/new`)}
        >
         Add Card
        </button>
        <button className="button button-delete" type="button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <div>
        <h2>Cards</h2>
        {cards.map((card, index) => (
          <div key={index} className="card-body">
            <p>{card.front}</p>

            <p>{card.back} </p>

            <button className="button button-view"
              type="button"
              onClick={() =>
                history.push(`/decks/${deckId}/cards/${card.id}/edit`)
              }
            >
              edit
            </button>
            <button className="button button-delete"type="button" onClick={() => deleteCardHandler(card.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
