import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Cards from "./Cards";

function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <section>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Study
      </nav>

      <h1>Study: {deck.name}</h1>
      <Cards cards={deck.cards}/>
    </section>
  );
}

export default Study;
