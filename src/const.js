export const Mode = {
  DEFAULT: 'default',
  POPUP: 'popup'
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export function sortFilmDate(filmA, filmB) {
  return new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);
}

export function sortFilmRating(filmA, filmB) {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
}
