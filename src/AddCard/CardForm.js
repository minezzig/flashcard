import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../utils/api/index";
import { updateCard } from "../utils/api/index";

function CardForm({ purpose, deckId, card, cardFront, cardBack }) {
  const history = useHistory();
  const initialForm = { front: "", back: "" };
  const [formData, setFormData] = useState({...initialForm});

  //try to get prefilled boxes
  useEffect(() => {
    setFormData({ front: cardFront, back: cardBack });
  }, [cardFront, cardBack]);

  // this is for the create a card
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if this is attached to the Create Card page - submit creates a card
    if (purpose === "create") {
      await createCard(deckId, formData);
      setFormData(initialForm);
    }
    // if this is attached to the Edit card page - edit this card on submit
    else {
      const updatedCard = { ...card, ...formData };
      console.log("updatead", updatedCard);
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          <p>Front:</p>

          <textarea
            type="text"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of deck"
          />
        </label>
<br/>
        <label htmlFor="back">
          <p>Back:</p>
          <textarea
            type="text"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
          />
        </label>

        {purpose === "create" ? (
          <div>
            <button type="button" onClick={handleDone}>
              Done
            </button>
            <button type="submit">Save</button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CardForm;

/*

        {purpose === "create" ? (
          <button type="button" onClick={handleDone}>
            {" "}
            Done{" "}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
        )}
        {purpose === "create" ? (
          <button type="submit">Save</button>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
*/
