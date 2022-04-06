import React from "react";
import { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

    //name input
    const changeName = (event) => {
      console.log(event.target.value);
      setDeck({ ...deck, name: event.target.value });
    };
  
    //description input
    const changeDescription = (event) => {
      setDeck({ ...deck, description: event.target.value });
    };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await createDeck(deck);
      history.push(`/decks/${response.id}`);
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> / Create Deck
      </nav>
      <h1>Create Deck</h1>
      <DeckForm purpose="create" deck={deck} changeName={changeName} changeDescription={changeDescription}handleSubmit={handleSubmit}/>
    </div>
  );
}

export default CreateDeck;
