import {remove, render} from '../framework/render.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsCardView from '../view/films-card-view.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/user-profile.js';
import FilmPopupPresenter from './popup-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class Presenter {
  filmsView = new FilmsView();
  filmsListComponent = new FilmListView;
  renderedFilmCount = FILM_COUNT_PER_STEP;
  filmsListTemplate = new FilmsListContainerView();
  headerProfile = new HeaderProfileView();

  constructor({ container, filmsModel, header}) {
    this.header = header;
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmsList = [...this.filmsModel.filmsCard];
    this.renderFilmsList();


    render(this.filmsView, this.container);
    render(this.filmsListComponent, this.filmsView.element);
    render(this.filmsListTemplate, this.filmsListComponent.element);
    if (this.filmsList.length > FILM_COUNT_PER_STEP) {
      this.button = new ShowMoreButtonView({onClick: this.handleLoadMoreButtonClick});
      render(this.button, this.filmsListComponent.element);
    }
    render(this.headerProfile, this.header);
  }

  handleLoadMoreButtonClick = () => {
    this.filmsList
      .slice(this.renderedFilmCount, this.renderedFilmCount + FILM_COUNT_PER_STEP)
      .map((film) => this.renderFilms(film));
    this.renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.renderedFilmCount >= this.filmsList.length) {
      remove(this.button);
    }
  };

  renderFilms (film) {
    const filmComments = this.filmsModel.commentsList.filter((comment) => film.comments.includes(String(comment.id)));
    const popupPresenter = new FilmPopupPresenter({film, filmComments});
    const filmCard = new FilmsCardView({film});


    filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
      popupPresenter.showPopup();
    });
    render(filmCard,this.filmsListTemplate.element);
  }

  renderFilmsList () {
    this.filmsList.slice(0, FILM_COUNT_PER_STEP).map((film) => {
      this.renderFilms(film);
    });
  }
}
