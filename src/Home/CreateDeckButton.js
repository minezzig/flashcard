import React from "react";
import { useHistory} from "react-router-dom";


function CreateDeckButton() {
  const history = useHistory();

  return (
    <button type="button" onClick={() => history.push("/decks/new")}>
      + Create Deck
    </button>
  );
}

export default CreateDeckButton;
