export const Mode = {
  DEFAULT: 'default',
  POPUP: 'popup'
};

export const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const USER_ACTION = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_FILM',
  DELETE_COMMENT: 'DELETE_FILM',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export function sortFilmDate(filmA, filmB) {
  return new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);
}

export function sortFilmRating(filmA, filmB) {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
}
