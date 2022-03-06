import React from "react";
import CreateDeckButton from "./CreateDeckButton";
import Decks from "./Decks";

function Home() {
  return (
    <div>
      <CreateDeckButton />
      <Decks />
    </div>
  );
}
export default Home;
