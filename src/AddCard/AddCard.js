import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function NewCard() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
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

  return (
    <div>
      <nav>

          <Link to={"/"}>Home</Link> /
          <Link to={`/decks/${deckId}`}> {deck.name} </Link>
          / Add Card

      </nav>
      <div>
        <h2>{deck.name}: Add Card</h2>
      </div>
      <CardForm purpose={"create"} deckId={deckId} />
    </div>
  );
}

export default NewCard;
