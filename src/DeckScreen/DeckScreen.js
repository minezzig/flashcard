import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckScreenCards from "./DeckScreenCards";
import { deleteDeck } from "../utils/api/index";
import { deleteCard } from "../utils/api/index";

function DeckScreen() {
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
          type="button"
          onClick={() => history.push(`/decks/${deckId}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => history.push(`/decks/${deckId}/study`)}
        >
          Study
        </button>
        <button
          type="button"
          onClick={() => history.push(`/decks/${deckId}/cards/new`)}
        >
          Add Cards
        </button>
        <button type="button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <div>
        <h2>Cards</h2>
        {cards.map((card) => (
          <DeckScreenCards
            card={card}
            deckId={deckId}
            deleteCardHandler={deleteCardHandler}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
}

export default DeckScreen;
