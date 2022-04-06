import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
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
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  //name input
  const changeName = (event) => {
    console.log(event.target.value);
    setDeck({ ...deck, name: event.target.value });
  };

  //description input
  const changeDescription = (event) => {
    setDeck({ ...deck, description: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.go(-1);
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Deck
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        purpose={"edit"}
        deckId={deckId}
        deck={deck}
        changeName={changeName}
        changeDescription={changeDescription}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditDeck;
