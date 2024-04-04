import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import "../style.css";
//const style = { border: "2px solid black", padding: "5px", width: "18rem" };

function DeckList({ deck }) {
  const history = useHistory();

  async function deleteHandler() {
    if (
      window.confirm(
        `Delete this deck? \n\nYou will not be able to recover it.`
      )
    ) {
      await deleteDeck(deck.id);
      history.go(0);
    }
  }

  return (
    <div>
      <div className="card-body">
        <div className="card-head">
          <h2>{deck.name}</h2>
          <p>{deck.cards.length} cards</p>
        </div>
        <div>
          <p>{deck.description}</p>
        </div>
        <div className="buttons">
          <button
            className="button button-view"
            type="button"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            view
          </button>
          <button
            className="button button-study"
            type="button"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            study
          </button>
          <button
            className="button button-delete float-right"
            type="button"
            onClick={deleteHandler}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckList;
