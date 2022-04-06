import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Cards({ cards }) {
  const history = useHistory();
  let [currentIndex, setCurrentIndex] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();

  if (!cards) {
    return null;
  }

  function handleFlip() {
    setFrontSide(!frontSide);
  }

  function handleNext() {
    if (currentIndex + 1 === cards.length) {
      if (
        window.confirm(
          "Review again?\nIf you click cancel you'll return to the homepage."
        )
      ) {
        setCurrentIndex(0);
        setFrontSide(true);
        return;
      } else {
        history.push("/");
      }
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setFrontSide(!frontSide);
  }

  return (
    <div>
      {!cards && <p>Loading...</p>}
      {cards.length <= 2 ? (
        <div>
          <h1>Not enough cards.</h1>
          <p>
            You need at least 3 cards to study. There are only {cards.length} in
            this deck
          </p>
          <button
            className="button button-view"
            type="button"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
      ) : (
        <div className={frontSide ? "card-front" : "card-back"}>
          <h3>
            Card {currentIndex + 1} of {cards.length}
          </h3>
          <h5>
            {frontSide ? cards[currentIndex].front : cards[currentIndex].back}
          </h5>
          <div>
            <button
              className="button button-view"
              type="button"
              onClick={handleFlip}
            >
              Flip
            </button>
            {frontSide ? null : (
              <button
                className="button button-study"
                type="button"
                onClick={handleNext}
              >
                next
              </button>
            )}{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
