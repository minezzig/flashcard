import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { createCard } from "../utils/api/index";

function NewCard() {
  const initialForm = { front: "", back: "" };
  const [formData, setFormData] = useState(initialForm);
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

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialForm);
  };

  return (
    <div>
      <nav>
        <p>
          <Link to={"/"}>Home</Link> /
          <Link to={`decks/${deckId}`}> {deck.name} </Link>/ Add Card
        </p>
      </nav>
      <div>
        <h2>{deck.name}: Add Card</h2>
      </div>
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

        <button type="button" onClick={handleDone}>
          Done
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewCard;
