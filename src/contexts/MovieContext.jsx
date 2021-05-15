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
    setCategoryHead("Search Results");
    setMovies(results);
  };

  const updateCategory = (categoryitem) => {
    setMovies([]);
    setPage(1);
    setCategory(categoryitem.key);
    setCategoryHead(categoryitem.name);
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const moviesObj = await fetch(
        `${head}${category}?api_key=${process.env.REACT_APP_API_KEY}${tail}${page}`
      );
      const moviesList = await moviesObj.json();
      setMovies([...moviesList.results]);
    } catch (error) {
      console.log(error);
    }
  };

  //Bookmark state
  const [bookmarks, dispatchBookmarks] = useReducer(
    watchlistReducer,
    [],
    () => {
      let localData = localStorage.getItem("watchlist");
      return localData ? JSON.parse(localData) : [];
    }
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const loadMoreMovies = async () => {
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
        loadMoreMovies,
        category,
        categoryHead,
        updateCategory,
        bookmarks,
        searchResults,
        dispatchBookmarks,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
