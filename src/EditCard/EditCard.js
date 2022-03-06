//!maybe use some of this.  made it accidently with edit Deck

import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { readCard } from "../utils/api/index";
import { updateCard } from "../utils/api/index";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const responseDeck = await readDeck(deckId, signal);
        setDeck(responseDeck);
        const responseCard = await readCard(cardId, signal);
        setCard(responseCard);
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
  }, [deckId, cardId]);

  const handleFrontChange = ({ target }) => {
    setFront(target.value);
  };

  const handleBackChange = ({ target }) => {
    setBack(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(deck);
    const updatedCard = { ...card, front, back };
    console.log("updatead", updatedCard);
    await updateCard(updatedCard);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      {!card && <h1>LOADING</h1>}
      {card && (
        <div>
          <nav>
            <Link to={"/"}>Home</Link> /
            <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Card{" "}
            {cardId}
          </nav>
          <h2>Edit Card</h2>
          <form>
            <div>
              <label htmlFor="name">
                <p>Front:</p>
                <textarea
                  id="front"
                  name="front"
                  onChange={handleFrontChange}
                  value={front}
                  placeholder={card.front}
                />
              </label>
              <label>
                <p>Back:</p>
                <textarea
                  name="back"
                  id="back"
                  placeholder={card.back}
                  onChange={handleBackChange}
                  value={back}
                ></textarea>
              </label>
            </div>
            <div>
              <button
                type="button"
                onClick={() => history.push(`/decks/${deckId}`)}
              >
                cancel
              </button>
              <button type="submit" onClick={handleSubmit}>
                submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditCard;
