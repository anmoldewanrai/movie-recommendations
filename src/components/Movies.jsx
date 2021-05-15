import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { Movie } from ".";
import "dotenv/config";

export const Movies = () => {
  const categories = [
    {
      name: "Top Rated",
      key: "top_rated",
    },
    {
      name: "Popular",
      key: "popular",
    },
    {
      name: "Latest",
      key: "latest",
    },
    {
      name: "Now Playing",
      key: "now_playing",
    },
    {
      name: "Upcoming",
      key: "upcoming",
    },
  ];

  const { movies, loadMoreMovies, categoryHead, updateCategory } =
    useContext(MovieContext);

  return (
    <section className="top-rated-movies-section">
      <section className="categories">
        {categories.map((categoryItem) => (
          <h3
            key={categoryItem.key}
            className="category-heading"
            onClick={() => {
              updateCategory(categoryItem);
            }}
          >
            {categoryItem.name}
          </h3>
        ))}
      </section>
      <h2 className="category-head">{categoryHead}</h2>
      <section className="movies">
        {movies && movies.length ? (
          movies.map((movie) => (
            <Movie key={movie.id} {...movie} bookmarked={false} />
          ))
        ) : (
          <h1>Fetch failed!</h1>
        )}
      </section>
      {movies && movies.length && (
        <div className="load-more-btn">
          <p
            onClick={() => {
              loadMoreMovies();
            }}
          >
            Load More
          </p>
        </div>
      )}
    </section>
  );
};
