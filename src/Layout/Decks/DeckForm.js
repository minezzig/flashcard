import React from "react";
import { useHistory } from "react-router-dom";

function DeckForm({
  purpose,
  deck,
  changeName,
  changeDescription,
  handleSubmit,
  deckId,
}) {
  const history = useHistory();

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <label htmlFor="deck-name">
          <h5>Name</h5>
          <input
            style={{ width: "350px" }}
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={deck.name ? deck.name : ""}
            onChange={changeName}
          />
        </label>
        <br />
        <label htmlFor="description">
          <h5>Description</h5>
          <textarea
            style={{ width: "350px" }}
            name="description"
            id="description"
            value={deck.description ? deck.description : ""}
            onChange={changeDescription}
            placeholder="Brief description of the deck"
          />
        </label>
        <div>
          {purpose === "create" ? (
            <button
              className="button button-delete"
              type="reset"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          ) : (
            <button
              className="button button-delete"
              type="reset"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              cancel
            </button>
          )}
          <button className="button button-view" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;
