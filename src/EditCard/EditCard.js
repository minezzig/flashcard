//!maybe use some of this.  made it accidently with edit Deck

import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { readCard } from "../utils/api/index";

import CardForm from "../AddCard/CardForm";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();

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

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Card {cardId}
      </nav>
      <h2>Edit Card</h2>
      <CardForm card={card} deckId={deckId} cardFront={card.front} cardBack={card.back}/>
    </div>
  );
}

export default EditCard;

/* // original form before adding to Card From
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
*/
