import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({
  purpose,
  changeFront,
  changeBack,
  card = {},
  handleSubmit,
  deckId,
}) {
  const history = useHistory();

  function cardFront() {
    return card.front ? card.front : "";
  }

  function cardBack() {
    return card.back ? card.back : "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-front">
        <div>
          <label htmlFor="front">
            <p>Front:</p>

            <textarea
              type="text"
              id="front"
              name="front"
              value={cardFront()}
              onChange={changeFront}
              placeholder="Front side of deck"
            />
          </label>
          <br />
          <label htmlFor="back">
            <p>Back:</p>
            <textarea
              type="text"
              id="back"
              name="back"
              value={cardBack()}
              onChange={changeBack}
              placeholder="Back side of card"
            />
          </label>
        </div>
        {purpose === "create" ? (
          <div>
            <button
              className="button button-study"
              type="button"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Done
            </button>
            <button
              className="button button-view"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <button
              className="button button-delete"
              type="button"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Cancel
            </button>
            <button
              className="button button-view"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>{" "}
    </form>
  );
}

export default CardForm;
