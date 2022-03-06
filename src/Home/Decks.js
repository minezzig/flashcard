import React from "react";
import { useState, useEffect } from "react";
import Deck from "./Deck";
import { listDecks } from "../utils/api/index";
/*
4 steps to clean up: 
1) declare abort controler
2) send signal to request
3) add try catch with error
4) return 
*/

function Decks() {
  // set up state for displaying decks
  const [deckList, setDeckList] = useState([]);

  // set up use effect to load decks
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDecks() {
      try {
        const response = await listDecks(signal);
        setDeckList(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    }

    getDecks();

    return () => abortController.abort();
  }, []);

  return (
    // map through decks to create  a deck card for each
    <div>
      {deckList.length === 0 && <p>LOADING...</p>}
      {deckList.map((deck, index) => (
        <Deck deck={deck} key={index} />
      ))}
    </div>
  );
}

export default Decks;
