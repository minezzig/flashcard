import React from "react";
import { Link } from "react-router-dom";

import DeckForm from "./DeckForm";

function CreateDeck() {
 
  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link> / Create Deck
      </nav>
      <h1>Create Deck</h1>
      <DeckForm purpose="create"/>
    </div>
  );
}

export default CreateDeck;
