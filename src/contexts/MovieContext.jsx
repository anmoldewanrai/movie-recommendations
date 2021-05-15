import React, { createContext, useEffect, useReducer, useState } from "react";
import { favouritesReducer, watchlistReducer } from "../reducers";
import "dotenv/config";
export const MovieContext = createContext();

const head = "https://api.themoviedb.org/3/movie/";
const tail = "&language=en-US&page=";

export const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [categoryHead, setCategoryHead] = useState("Popular");
  const [page, setPage] = useState(1);

  const searchResults = (results) => {
    setCategory("search Results");
    setMovies(results);
  };

  const updateCategory = (newList) => {
    setMovies([...movies, ...newList]);
  };

  const [bookmarks, dispatchBookmarks] = useReducer(
    watchlistReducer,
    [],
    () => {
      let localData = localStorage.getItem("watchlist");
      return localData ? JSON.parse(localData) : [];
    }
  );

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const fetchMovies = async () => {
    console.log(category);
    setPage(page + 1);
    try {
      let newList = [];
      const moviesObj = await fetch(
        `${head}${category}?api_key=${process.env.REACT_APP_API_KEY}${tail}${page}`
      );
      const moviesList = await moviesObj.json();
      newList = [...moviesList.results];
      setMovies([...movies, ...newList]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MovieContext.Provider
      value={{
        movies,
        category,
        categoryHead,
        updateCategory,
        bookmarks,
        searchResults,
        dispatchBookmarks,
        fetchMovies,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
