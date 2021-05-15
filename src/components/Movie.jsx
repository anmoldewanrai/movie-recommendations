import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import { motion } from "framer-motion";

// Assets import
import BookmarkIcon from "../assets/bookmark_svg.svg";
import HeartIcon from "../assets/heart_svg.svg";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
export const Movie = ({
  id,
  title,
  poster_path,
  overview,
  vote_average,
  bookmarked,
}) => {
  const { dispatchBookmarks } = useContext(MovieContext);
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

  const bookmarkMovie = (bookmarked) => {
    console.log(bookmarked);
    bookmarked
      ? dispatchBookmarks({
          type: "REMOVE_BOOKMARK",
          id,
        })
      : dispatchBookmarks({
          type: "ADD_BOOKMARK",
          movie: {
            id,
            title,
            poster_path,
            overview,
            vote_average,
            bookmarked: true,
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
      <img loading="lazy" src={IMG_API + poster_path} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteColor(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-over">
        <div className="moive-options">
          <img
            src={BookmarkIcon}
            onClick={() => bookmarkMovie(bookmarked)}
            className="option-icon bookmark"
            alt="bookmark"
          />
          <img src={HeartIcon} className="option-icon heart" alt="like" />
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
