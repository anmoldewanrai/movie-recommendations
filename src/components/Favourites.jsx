import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { Movie } from "./";

import HeartIcon from "../assets/heart_svg.svg";

export const Favourites = () => {
  const { favourites } = useContext(MovieContext);

  return favourites.length ? (
    <section className="watchlist-section">
      <h2 className="category-head">Favourites ({favourites.length})</h2>
      <section className="movies">
        {favourites.length
          ? favourites
              .reverse()
              .map((favorite) => <Movie key={favorite.id} {...favorite} />)
          : null}
      </section>
    </section>
  ) : (
    <section className="no-watchlist-section">
      <h2>No Favourite(s) Added</h2>
      <h3>
        Add Movies that you like by clicking
        <img src={HeartIcon} className="favourite-icon" alt="like" />
      </h3>
    </section>
  );
};
