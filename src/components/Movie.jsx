import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { motion } from "framer-motion";

// Assets import
import WatchlistIcon from "../assets/watchlist_icon.svg";
import HeartIcon from "../assets/heart_svg.svg";
import FallbackPoster from "../assets/fallback_poster.jpg";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
export const Movie = ({
  id,
  title,
  poster_path,
  overview,
  vote_average,
  inWatchlist,
  inFavourites,
}) => {
  const { dispatchFavourites, dispatchWatchlist } = useContext(MovieContext);
  let note = "Recommend a friend";
  note = false;
  const setVoteColor = (avg) => {
    if (avg >= 8) {
      return "green";
    } else if (avg >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  const addToWatchlist = (inWatchlist) => {
    console.log(inWatchlist);
    inWatchlist
      ? dispatchWatchlist({
          type: "REMOVE_BOOKMARK",
          id,
        })
      : dispatchWatchlist({
          type: "ADD_BOOKMARK",
          movie: {
            id,
            title,
            poster_path,
            overview,
            vote_average,
            inWatchlist: true,
          },
        });
  };
  const addToFavourites = (inFavourites) => {
    inFavourites
      ? dispatchFavourites({
          type: "REMOVE_FAVOURITE",
          id,
        })
      : dispatchFavourites({
          type: "ADD_FAVOURITE",
          movie: {
            id,
            title,
            poster_path,
            overview,
            vote_average,
            inFavourites: true,
          },
        });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="movie"
    >
      <img
        loading="lazy"
        src={poster_path ? IMG_API + poster_path : FallbackPoster}
        alt={title}
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteColor(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-over">
        <div className="moive-options">
          <img
            title="Add To Watchlist"
            src={WatchlistIcon}
            onClick={() => addToWatchlist(inWatchlist)}
            className="option-icon bookmark"
            alt="bookmark"
          />
          <img
            title="Add To Favorites"
            src={HeartIcon}
            onClick={() => addToFavourites(inFavourites)}
            className="option-icon heart"
            alt="like"
          />
        </div>
        <h2>Overview</h2>

        <p>{overview}</p>
        {note && (
          <>
            <hr class="note-divider" />
            <h4>Note ✏️</h4>
            <p>{note}</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

// {IMG_API + poster_path}
