// Dependency Imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component Imports
import { Navbar, Hero, Movies, WatchList, Favourites } from "./components";

// Context Imports
import MovieContextProvider from "./contexts/MovieContext.jsx";

export const App = () => {
  return (
    <MovieContextProvider>
      <div className="movie-container">
        <Router>
          <Navbar />
          <Hero />
          <Switch>
            <Route exact path="/">
              <Movies />
            </Route>
            <Route path="/favourites">
              <Favourites />
            </Route>
            <Route path="/watchlist">
              <WatchList />
            </Route>
          </Switch>
        </Router>
      </div>
    </MovieContextProvider>
  );
};
