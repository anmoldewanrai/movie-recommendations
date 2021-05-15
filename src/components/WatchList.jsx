import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { Movie } from "./";

export const WatchList = () => {
  const { bookmarks } = useContext(MovieContext);

  return bookmarks.length ? (
    <section className="watchlist-section">
      <h3 className="category-heading watchlist">Watchlist</h3>

      <section className="movies">
        {bookmarks && bookmarks.length
          ? bookmarks
              .reverse()
              .map((bookmark) => <Movie key={bookmark.id} {...bookmark} />)
          : null}
      </section>
    </section>
  ) : null;
};
