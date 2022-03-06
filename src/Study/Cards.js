import React from "react";
import { useState } from "react";
import { useHistory, useParams} from "react-router-dom";

function Cards({ cards }) {
  const history = useHistory();
  let [currentIndex, setCurrentIndex] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const {deckId} = useParams();

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
          <p>You need at least 3 cards to study.  There are only {cards.length} in this deck</p>
          <button type="button" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
        </div>
      ) : (
        <div>
          <h3>
            Card {currentIndex + 1} of {cards.length}
          </h3>
          <p>
            {frontSide ? cards[currentIndex].front : cards[currentIndex].back}
          </p>
          <button type="button" onClick={handleFlip}>
            Flip
          </button>
          {frontSide ? null : (
            <button type="button" onClick={handleNext}>
              next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cards;
//{cards.map((card, index) => (<p key={index}>Card {card.front}</p>))}
/*
  useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      const getCurrentCard = () => {
      try {

      } catch (error) {
          if (error.message === "AbortError") {
              console.log(error);
          }else {
              throw error;
          }
      }
    };
    getCurrentCard();

    return () => abortController.abort();
  }, [currentCard]) 
*/

/*
function Cards() {
  const [cards, setCards] = useState([[]]);
  const [currentCard, setCurrentCard] = useState("");
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setCards(response.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    getDeck();

    return () => abortController.abort();
  }, [deckId]);
console.log(cards[0].front);
  setCurrentCard(cards[0].front);
  
  return (
    <div>
      <p>{currentCard}</p>
    </div>
  );
}
*/

/*
function Cards() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  console.log(cards);

  return (
        <div>
      <h3>Cards in deck: {cards.length}</h3>
    {cards.map((card) => (<p>{card.front}</p>))}
      <button classList type="button" onClick={() => console.log("next")}>Next</button>

    </div>
  );
}
*/
