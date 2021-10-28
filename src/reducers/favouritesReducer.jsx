export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [
        ...state,
        {
          id: action.movie.id,
          title: action.movie.title,
          poster_path: action.movie.poster_path,
          overview: action.movie.overview,
          vote_average: action.movie.vote_average,
          isFavourite: action.movie.isFavourite,
        },
      ];
    case "REMOVE_FAVOURITE":
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
};
