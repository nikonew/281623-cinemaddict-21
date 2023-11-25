import {UPDATE_TYPE, USER_ACTION} from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilmsCardView from '../view/films-card-view.js';
import FilmPopupPresenter from './popup-presenter.js';

export default class FilmPresenter {
  #film = null;
  #comments = null;
  #filmContainer = null;
  #handleUpdateFilm = null;
  #filmComponent = null;
  #popupPresenter = null;
  #currentFilterType = null;
  //#handleDeleteComment = null;

  constructor({filmContainer, onDataChange, currentFilterType}) {
    this.#filmContainer = filmContainer;
    this.#handleUpdateFilm = onDataChange;
    this.#currentFilterType = currentFilterType;
  }


  init(film, filmsModel) {
    console.log(film);
    this.#film = film;
    this.#comments = filmsModel.commentsList.filter((comment) => film.comments.includes(String(comment.id)));
    this.#popupPresenter = new FilmPopupPresenter({
      film: this.#film,
      filmComments: this.#comments,
      onControlBtnClick: this.#handleControlButton,
      handleDeleteComment: this.#handleDeleteComment
    });

    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmsCardView({
      film: this.#film,
      onClick: this.#handleClick,
      onControlBtnClick: this.#handleControlButton,
    });


    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmContainer);
      return;
    }

    if (this.#filmContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }


    remove(prevFilmComponent);
  }

  destroy() {
    remove(this.#filmComponent);
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  #handleControlButton = (updatedUserDetails, controlFilter) => {
    if (controlFilter === this.#currentFilterType) {
      this.destroy();
    }
    this.#handleUpdateFilm(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      {...this.#film, userDetails: updatedUserDetails}
    );
  };


  #handleDeleteComment = (updatedFilm) => {
    this.#handleUpdateFilm(
      USER_ACTION.DELETE_COMMENT,
      UPDATE_TYPE.PATCH,
      updatedFilm
    );
  };

}
