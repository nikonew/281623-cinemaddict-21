import AbstractView from '../framework/view/abstract-view.js';


function createFilterTemplate (filmFilters) {
  return `<nav class="main-navigation">
    <a href="#all" data-id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" data-id="watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmFilters.watchlist.filterFilms.length}</span></a>
    <a href="#history" data-id="historywatchlist" class="main-navigation__item">History <span class="main-navigation__item-count">${filmFilters.history.filterFilms.length}</span></a>
    <a href="#favorites" data-id="favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmFilters.favorites.filterFilms.length}</span></a>
  </nav>`;
}

export default class FilterFilmsView extends AbstractView {

  constructor({filmFilters, onWatchlistClick, onWatchedClick, onFavoriteClick}) {
    super();
    this.filmFilters = filmFilters;

    this.handleWatchlistClick = onWatchlistClick;
    this.handleWatchedClick = onWatchedClick;
    this.handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.watchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.favoriteClickHandler);
  }

  get template() {
    return createFilterTemplate(this.filmFilters);
  }

  watchlistClickHandler = () => {
    this.handleWatchlistClick();
  };

  watchedClickHandler = () => {
    this.handleWatchedClick();
  };

  favoriteClickHandler = () => {
    this.handleFavoriteClick();
  };

}
