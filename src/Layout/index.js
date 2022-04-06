import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Main/Home";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import Study from "./Cards/Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
