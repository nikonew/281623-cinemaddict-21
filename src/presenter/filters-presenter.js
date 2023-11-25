import {FILTER_TYPE, UPDATE_TYPE} from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilterFilmsView from '../view/filter-films.js';

export default class FilmsFiltersPresenter {
  #filtersContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({filtersContainer, filmsModel, filterModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.filmsCard;

    const filters = {
      all: {
        type: FILTER_TYPE.ALL,
        name: 'All movies',
        emptyFilmsMessage: 'There are no movies in our database',
        films: [...films]
      },
      watchlist: {
        type: FILTER_TYPE.WATCHLIST,
        name: 'Watchlist',
        emptyFilmsMessage: 'There are no movies to watch now',
        films: []
      },
      history: {
        type: FILTER_TYPE.HISTORY,
        name: 'History',
        emptyFilmsMessage: 'There are no watched movies now',
        films: []
      },
      favorites: {
        type: FILTER_TYPE.FAVORITES,
        name: 'Favorites',
        emptyFilmsMessage: 'There are no favorite movies now',
        films: []
      }
    };

    films.forEach((film) => {
      if (film.userDetails.watchlist) {
        filters.watchlist.films.push(film);
      }
      if (film.userDetails.alreadyWatched) {
        filters.history.films.push(film);
      }
      if (film.userDetails.favorite) {
        filters.favorites.films.push(film);
      }
    });

    return filters;
  }

  init() {
    const filters = this.filters;
    //const prevUserRankComponent = this.#userRankComponent;
    const prevFilterComponent = this.#filterComponent;

    //const watchedFilmsQuantity = filters.history.films.length;

    this.#filterComponent = new FilterFilmsView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    // if (prevUserRankComponent === null) {
    //   render(this.#userRankComponent, this.#userRankContainer);
    // } else {
    //   replace(this.#userRankComponent, prevUserRankComponent);
    //   remove(prevUserRankComponent);
    // }

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
    } else {
      replace(this.#filterComponent, prevFilterComponent);
      remove(prevFilterComponent);
    }

    // if (watchedFilmsQuantity === 0) {
    //   remove(this.#userRankComponent);
    //   this.#userRankComponent = null;
    // }

  }


  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };


}
