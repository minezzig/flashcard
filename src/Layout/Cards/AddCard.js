import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [newCard, setNewCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId } = useParams();

  // fetch deck
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

  //submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewCard({ ...newCard, deckId: deckId });
    await createCard(deckId, newCard);
    setNewCard({ front: "", back: "", deckId: "" });
  };

  //front input
  const changeFront = (event) => {
    console.log(event.target.value);
    setNewCard({ ...newCard, front: event.target.value });
  };

  //back input
  const changeBack = (event) => {
    setNewCard({ ...newCard, back: event.target.value });
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> /
        <span> Add Card</span>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardForm
        changeFront={changeFront}
        changeBack={changeBack}
        card={newCard}
        handleSubmit={handleSubmit}
        deckId={deckId}
        purpose={"create"}
      />
    </div>
  );
}

export default AddCard;
