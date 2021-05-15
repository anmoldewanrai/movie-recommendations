export const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return [
        ...state,
        {
          id: action.movie.id,
          title: action.movie.title,
          poster_path: action.movie.poster_path,
          overview: action.movie.overview,
          vote_average: action.movie.vote_average,
          bookmarked: action.movie.bookmarked,
        },
      ];
    case "REMOVE_BOOKMARK":
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
};
