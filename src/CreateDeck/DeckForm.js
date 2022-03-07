import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import { updateDeck } from "../utils/api/index";

function DeckForm({ purpose, deckId, deck, deckName, deckDescription }) {
  const history = useHistory();
  const initialFormData = { name: deckName, description: deckDescription };
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData.name, formData.description);

  useEffect(() => {
   setFormData({ name: deckName, description: deckDescription });
  }, [deckName, deckDescription]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    if (purpose === "create") {
      // used to create a new deck
      event.preventDefault();
      const response = await createDeck(formData);
      history.push(`/decks/${response.id}`);
    } else {
      //used to edit a deck
      event.preventDefault();
      console.log(formData);
      const updatedDeck = { ...deck, ...formData };
      console.log(updatedDeck);
      await updateDeck(updatedDeck);
      history.go(-1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deck-name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
          />
        </label>
        {purpose === "create" ? (
          <button type="reset" onClick={() => history.push("/")}>
            Cancel
          </button>
        ) : (
          <button type="reset" onClick={() => history.push(`/decks/${deckId}`)}>
            cancel
          </button>
        )}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckForm;

/*
before i made one state

import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import { updateDeck } from "../utils/api/index";

function DeckForm({ purpose, deckId, deck, nameEdit, descriptionEdit }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(descriptionEdit);
  console.log(descriptionEdit)
  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = async (event) => {
    if (purpose === "create") {
      // used to create a new deck
      event.preventDefault();
      const response = await createDeck({ name, description });
      history.push(`/decks/${response.id}`);
    } else {
      //used to edit a deck
      event.preventDefault();
      console.log(name, description);
      const updatedDeck = { ...deck, name, description };
      console.log(updatedDeck);
      await updateDeck(updatedDeck);
      history.go(-1);
    }
  };

  return (
    <div>
      {!deck && <p>Loading...</p>}
      {nameEdit && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="deck-name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Deck Name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <br />
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Brief description of the deck"
            />
          </label>
          {purpose === "create" ? (
            <button type="reset" onClick={() => history.push("/")}>
              Cancel
            </button>
          ) : (
            <button
              type="reset"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              cancel
            </button>
          )}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default DeckForm;
*/
