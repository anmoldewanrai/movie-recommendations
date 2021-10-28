import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { Movie } from "./";

import WatchlistIcon from "../assets/watchlist_icon.svg";

export const WatchList = () => {
  const { watchlist } = useContext(MovieContext);

  return watchlist.length ? (
    <section className="watchlist-section">
      <h2 className="category-head">Watchlist ({watchlist.length})</h2>
      <section className="movies">
        {watchlist.length
          ? watchlist
              .reverse()
              .map((bookmark) => <Movie key={bookmark.id} {...bookmark} />)
          : null}
      </section>
    </section>
  ) : (
    <section className="no-watchlist-section">
      <h2>No Movies on your Watchlist</h2>
      <h3>
        Add Movies that you want to watch later by clicking
        <img src={WatchlistIcon} className="no-watchlist-icon" alt="like" />
      </h3>
    </section>
  );
};
