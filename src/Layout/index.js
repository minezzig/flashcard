import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Home/Home";
import CreateDeck from "../CreateDeck/CreateDeck";
import DeckScreen from "../DeckScreen/DeckScreen";
import EditDeck from "../EditDeck/EditDeck";
import Study from "../Study/Study";
import NewCard from "../AddCard/AddCard";
import EditCard from "../EditCard/EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <NewCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
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
