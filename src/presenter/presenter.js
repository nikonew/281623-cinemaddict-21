import {render} from '../framework/render.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsCardView from '../view/films-card-view.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/user-profile.js';
import FilmPopupPresenter from './popup-presenter.js';

export default class Presenter {
  filmsView = new FilmsView();
  filmsListComponent = new FilmListView;

  filmsListTemplate = new FilmsListContainerView();
  button = new ShowMoreButtonView();
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
    render(this.button, this.filmsListComponent.element);
    render(this.headerProfile, this.header);
  }

  renderFilms (film) {
    const filmComments = this.filmsModel.commentsList.filter((comment) => film.comments.includes(comment.id));
    const popupPresenter = new FilmPopupPresenter({film, filmComments});
    const filmCard = new FilmsCardView({film});


    filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
      popupPresenter.showPopup();
    });
    render(filmCard,this.filmsListTemplate.element);
  }

  renderFilmsList () {
    this.filmsList.map((film) => {
      this.renderFilms(film);
    });
  }
}
