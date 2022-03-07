import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

import DeckForm from "../CreateDeck/DeckForm";

function EditDeck() {
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

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Deck
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm purpose={"edit"} deckId={deckId} deck={deck} deckName={deck.name} deckDescription={deck.description}/>
    </div>
  );
}

export default EditDeck;

/*
//! ORIGINAL EDIT DECK
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { updateDeck } from "../utils/api/index";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = {...deck, name, description}
    console.log(updatedDeck);
    await updateDeck(updatedDeck)
    history.go(-1);
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Deck
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <div>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleNameChange}
              value={name}
              placeholder={deck.name}
            />
          </label>
          <label>
            <textarea
              name="description"
              id="description"
              placeholder={deck.description}
              onChange={handleDescriptionChange}
              value={description}
            ></textarea>
          </label>
        </div>
        <div>
          <button type="reset" onClick={() => history.push(`/decks/${deckId}`)}>
            cancel
          </button>
          <button type="submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDeck;

*/
