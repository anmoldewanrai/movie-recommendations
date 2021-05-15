import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MovieContext } from "../contexts/MovieContext";
import "dotenv/config";

// Assets import

import siteLogo from "../assets/site_logo.png";
import searchIcon from "../assets/search_icon.svg";
import BookmarkIcon from "../assets/bookmark_svg.svg";
import HeartIcon from "../assets/heart_icon.png";

export const Navbar = () => {
  const { searchResults } = useContext(MovieContext);
  const head = "https://api.themoviedb.org/3/search/movie?api_key=";
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (query) => {
    try {
      const searchObj = await fetch(
        `${head}${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
      );
      const searchResult = await searchObj.json();
      console.log(searchResult.results);
      searchResults(searchResult.results);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTerm.trim() && searchMovies(searchTerm);
  };

  return (
    <nav className="scroll">
      <div className="site-logo">
        <img src={siteLogo} alt="site_logo" />
        <h1>
          <a href="#">Movie Buff</a>
        </h1>
      </div>
      <div className="nav-links">
        <form onSubmit={handleSubmit}>
          <img
            src={searchIcon}
            className="search-icon"
            alt="search icon"
            draggable="false"
          />
          <input
            type="text"
            className="search-input"
            required
            placeholder="Quick search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <NavLink to="/" className="nav-link">
          Browse
        </NavLink>
        <NavLink to="/favourites">
          <img className="nav-link favourites" src={HeartIcon} alt="like" />
        </NavLink>
        <NavLink to="/watchlist">
          <img
            className="nav-link watchlist"
            src={BookmarkIcon}
            alt="bookmark"
          />
        </NavLink>
      </div>
    </nav>
  );
};
