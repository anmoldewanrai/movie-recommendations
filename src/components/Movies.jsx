import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { Movie } from ".";
import "dotenv/config";

export const Movies = () => {
  const head = "https://api.themoviedb.org/3/movie/";
  const tail = "&language=en-US&page=";
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

  const { movies, fetchMovies, categoryHead, updateCategory } =
    useContext(MovieContext);

  const getMovies = async (key, name) => {
    updateCategory(key, name);

    try {
      let newList = [];
      const moviesObj = await fetch(
        `${head}${key}?api_key=${process.env.REACT_APP_API_KEY}${tail}1`
      );
      const moviesList = await moviesObj.json();
      newList = [...moviesList.results];
      updateCategory(newList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="top-rated-movies-section">
      <section className="categories">
        {categories.map((categoryItem) => (
          <h3
            key={categoryItem.key}
            className="category-heading"
            onClick={() => {
              getMovies(categoryItem.key, categoryItem.name);
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
              fetchMovies();
            }}
          >
            Load More
          </p>
        </div>
      )}
    </section>
  );
};
