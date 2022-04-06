import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";

import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const responseDeck = await readDeck(deckId, signal);
        setDeck(responseDeck);
        const responseCard = await readCard(cardId, signal);
        setCard(responseCard);
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
  }, [deckId, cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
  };

  const changeFront = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const changeBack = (event) => {
    console.log(event.target.value)
    setCard({ ...card, back: event.target.value });
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> /
        <Link to={`/decks/${deckId}`}> {deck.name}</Link> / Edit Card {cardId}
      </nav>
      <h2>Edit Card</h2>
      <CardForm
        purpose={"edit"}
        changeFront={changeFront}
        changeBack={changeBack}
        card={card}
        handleSubmit={handleSubmit}
        deckId={deckId}
      />
    </div>
  );
}

export default EditCard;
