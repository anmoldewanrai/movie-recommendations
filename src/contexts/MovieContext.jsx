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
    // setMovies([]);
    setPage(1);
    setCategory(categoryitem.key);
    setCategoryHead(categoryitem.name);
    fetchMovies();
  };

  const fetchMovies = async () => {
    // try {
    //   const moviesObj = await fetch(
    //     `${head}${category}?api_key=${process.env.REACT_APP_API_KEY}${tail}${page}`
    //   );
    //   const moviesList = await moviesObj.json();
    //   setMovies([...moviesList.results]);
    // } catch (error) {
    //   console.log(error);
    // }
    let localTMDB = JSON.parse(localStorage.getItem("results"));
    setMovies([...localTMDB]);
  };

  //Watchlist state
  const [watchlist, dispatchWatchlist] = useReducer(
    watchlistReducer,
    [],
    () => {
      let localData = localStorage.getItem("watchlist");
      return localData ? JSON.parse(localData) : [];
    }
  );

  // Favourites state
  const [favourites, dispatchFavourites] = useReducer(
    favouritesReducer,
    [],
    () => {
      let localData = localStorage.getItem("favourites");
      return localData ? JSON.parse(localData) : [];
    }
  );

  // USE EFFECTS
  useEffect(() => {
    fetchMovies();
  }, [category]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const loadMoreMovies = async () => {
    setPage(page + 1);
    try {
      let newList = [];
      const moviesObj = await fetch(
        `${head}${category}?api_key=${process.env.REACT_APP_API_KEY}${tail}${
          page + 1
        }`
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
        watchlist,
        favourites,
        searchResults,
        dispatchFavourites,
        dispatchWatchlist,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
