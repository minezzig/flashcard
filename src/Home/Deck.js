import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

const style = { border: "2px solid black", padding: "10px" };

function Deck({ deck }) {
  const history = useHistory();

  async function deleteHandler() {
    if (
      window.confirm(
        `Are you sure you want to delete deck #${deck.id}?\nIf you do, you won't be able to review "${deck.name}" any longer.`
      )
    ) {
      await deleteDeck(deck.id);
      history.go(0)
    }
  }
  return (
    <section style={style}>
      <h2>
        {deck.id} - {deck.name} ({deck.cards.length})
      </h2>
      <p>{deck.description}</p>
      <button
        className="btn-primary btn mr-2"
        type="button"
        onClick={() => history.push(`/decks/${deck.id}`)}
      >
        view
      </button>
      <button
        className="btn-secondary btn mr-2"
        type="button"
        onClick={() => history.push(`/decks/${deck.id}/study`)}
      >
        study
      </button>
      <button
        className="btn-danger btn mr-2"
        type="button"
        onClick={deleteHandler}
      >
        delete
      </button>
    </section>
  );
}

export default Deck;
