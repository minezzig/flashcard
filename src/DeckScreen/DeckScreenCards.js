import React from "react";
import {useHistory} from "react-router-dom";

const style = { border: "2px solid black", padding: "10px" };

function DeckScreenCards({ card, deckId, deleteCardHandler}) {
  const history = useHistory();
  return (
    <div style={style}>
      <table>
        <tbody>
            <tr>
              <td>
                <p>{card.front}</p>
              </td>
              <td>
                {card.back}
              <br />
                <button type="button" onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>edit</button>
                <button type="button" onClick={() => deleteCardHandler(card.id)}>delete</button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeckScreenCards;
