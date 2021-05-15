import {
  latestMovies,
  topRatedMovies,
  featuredMovies,
} from "../api_endpoints/endpoints";

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "featured":
      return featuredMovies;
    case "top_rated":
      return topRatedMovies;
    case "latest":
      return latestMovies;
    default:
      return state;
  }
};
