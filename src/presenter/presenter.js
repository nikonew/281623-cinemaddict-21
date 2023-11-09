import {remove, render} from '../framework/render.js';
import FilmTitleView from '../view/film-title-view.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsView from '../view/films-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsFiltersPresenter from './filters-presenter.js';

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const FILM_COUNT_PER_STEP = 5;

export default class Presenter {
  #filmsView = new FilmsView();
  #filmsListComponent = new FilmListView;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmsListTemplate = new FilmsListContainerView();
  #filmsModel = null;
  #filmsList = [];
  #filmFilters = null;
  #container = null;
  #button = null;
  #filmPresenter = new Map();
  #filtersPresenter = null;


  constructor({ container, filmsModel, filmFilters}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filmFilters = filmFilters;
    this.#filmsList = [...this.#filmsModel.filmsCard];
  }

  init() {
    this.#renderFilters();
    this.#renderFilmsContainers ();
    this.#renderFilmsList();

    if (this.#filmsList.length === 0) {
      this.#renderFilmListTitle();
      return;
    }

    if (this.#filmsList.length > FILM_COUNT_PER_STEP) {
      this.#button = new ShowMoreButtonView({onClick: this.#handleLoadMoreButtonClick});
      render(this.#button, this.#filmsListComponent.element);
    }

  }

  #renderFilms (film) {
    const filmPresenter = new FilmPresenter({
      filmContainer: this.#filmsListTemplate.element,
      onDataChange: this.#handleUpdateFilm
    });
    filmPresenter.init(film, this.#filmsModel);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilters() {
    this.#filtersPresenter = new FilmsFiltersPresenter({
      filtersContainer: this.#container,
      films: this.#filmsList
    });
  }

  #renderFilmsContainers () {
    render(this.#filmsView, this.#container);
    render(this.#filmsListComponent, this.#filmsView.element);
    render(this.#filmsListTemplate, this.#filmsListComponent.element);
  }

  #renderFilmListTitle() {
    render(new FilmTitleView({
      filters: this.#filtersPresenter.filters,
      activeFilter: this.#filtersPresenter.activeFilter
    }), this.#filmsListComponent.element);
  }

  #handleLoadMoreButtonClick = () => {
    this.#filmsList
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .map((film) => this.#renderFilms(film));
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#filmsList.length) {
      remove(this.#button);
    }
  };

  #clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
  }

  #handleUpdateFilm = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };


  #renderFilmsList () {
    this.#filmsList.slice(0, FILM_COUNT_PER_STEP).map((film) => {
      this.#renderFilms(film);
    });
  }
}
