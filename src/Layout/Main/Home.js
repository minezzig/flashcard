import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks } from "../../utils/api/index";
import "../style.css";

function Home() {
  // set up state for displaying decks
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  // set up use effect to load decks
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function getDecks() {
      try {
        const response = await listDecks(signal);
        setDecks(response);
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
    <div>
      <button
        className="button button-create"
        type="button"
        onClick={() => history.push("/decks/new")}
      >
        + Create Deck
      </button>
      {!decks.length ? (
        <div style={{ fontSize: "24px", color: "white" }}>Loading decks...</div>
      ) : (
        decks.map((deck) => <DeckList deck={deck} key={deck.id}  />)
      )}
    </div>
  );
}
export default Home;
