import {DATA_FORMAT, SORT_TYPE, UPDATE_TYPE} from '../const.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {humanizeFilmsDueDate} from '../util.js';
import FilmTitleView from '../view/film-title-view.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsView from '../view/films-view.js';
import SortView from '../view/sort-films.js';
import FilmPresenter from './film-presenter.js';
import FilmsFiltersPresenter from './filters-presenter.js';


const FILM_COUNT_PER_STEP = 5;

export default class Presenter {
  #filmsView = new FilmsView();
  #filmsListComponent = new FilmListView;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmsListTemplate = new FilmsListContainerView();
  #filmsModel = null;
  #filterModel = null;
  #container = null;
  #button = null;
  #filmPresenter = new Map();
  #filmTitleView = null;
  #sortComponent = null;
  #currentSortType = SORT_TYPE.DEFAULT;
  #filtersPresenter = null;

  constructor({ container, filmsModel, filterModel}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films () {
    const filterType = this.#filterModel.filter;
    const filteredFilms = this.#filtersPresenter.filters[filterType].films;

    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return filteredFilms.sort((a, b) => humanizeFilmsDueDate(b.filmInfo.release.date, DATA_FORMAT.FILMS_CARD) - humanizeFilmsDueDate(a.filmInfo.release.date, DATA_FORMAT.FILMS_CARD));
      case SORT_TYPE.RATING:
        return filteredFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }
    return filteredFilms;
  }

  init() {
    this.#renderFilters();
    this.#renderPageFilm();

  }

  #renderFilms (film) {
    const filmPresenter = new FilmPresenter({
      filmContainer: this.#filmsListTemplate.element,
      currentFilterType: this.#filterModel.filter,
      onDataChange: this.#handleUpdateFilm,
    });
    filmPresenter.init(film, this.#filmsModel);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilters() {
    this.#filtersPresenter = new FilmsFiltersPresenter({
      filtersContainer: this.#container,
      //userRankContainer: userRankContainer,
      filterModel: this.#filterModel,
      filmsModel: this.#filmsModel
    });

    this.#filtersPresenter.init();
  }

  #renderSort() {
    remove(this.#sortComponent);
    this.#sortComponent = new SortView({currentSortType: this.#currentSortType, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#filmsView.element, RenderPosition.BEFOREBEGIN);
  }

  #renderFilmsContainers () {
    render(this.#filmsView, this.#container);
    render(this.#filmsListComponent, this.#filmsView.element);
    render(this.#filmsListTemplate, this.#filmsListComponent.element);
  }

  #renderFilmListTitle() {
    //const prevFilmsTitleView = this.#filmTitleView;
    this.#filmTitleView = new FilmTitleView({filters: this.#filtersPresenter.filters,activeFilter: this.#filterModel.filter});
    // if (prevFilmsTitleView) {
    //   replace(this.#filmTitleView, prevFilmsTitleView);
    // } else {
    render(this.#filmTitleView, this.#filmsListComponent.element);

  }

  #renderShowMoreBtn () {
    remove(this.#button);
    if (this.films.length > FILM_COUNT_PER_STEP) {
      this.#button = new ShowMoreButtonView({onClick: this.#handleLoadMoreButtonClick});
      render(this.#button, this.#filmsListComponent.element);
    }
  }


  #handleLoadMoreButtonClick = () => {
    this.films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .map((film) => this.#renderFilms(film));
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.films.length) {
      remove(this.#button);
    }
  };

  #clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#button);
    this.#renderShowMoreBtn();
    remove(this.#filmTitleView);
  }

  #handleUpdateFilm = (updatedFilm) => {
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.films);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#renderSort();
    this.#clearFilmList();
    this.#renderFilmsList ();
  };

  #renderFilmsList () {
    this.films.slice(0, FILM_COUNT_PER_STEP).map((film) => {
      this.#renderFilms(film);
    });
  }

  #renderPageFilm () {
    this.#renderFilmsList();
    this.#renderFilmsContainers ();
    this.#renderSort();

    if (this.films.length === 0) {
      this.#renderFilmListTitle();
    }
    this.#renderShowMoreBtn ();
  }

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;

      case UPDATE_TYPE.MINOR:
        this.#clearFilmList();
        this.#renderPageFilm();
        break;

      case UPDATE_TYPE.MAJOR:
        this.#clearFilmList({ resetSortType: true });
        this.#renderPageFilm();
        break;

      case UPDATE_TYPE.INIT:
        this.#renderPageFilm();
        break;
    }
  };

}
