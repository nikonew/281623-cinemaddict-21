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

  constructor({filmContainer, onDataChange}) {
    this.#filmContainer = filmContainer;
    this.#handleUpdateFilm = onDataChange;
  }


  init(film, filmsModel) {
    this.#film = film;
    this.#comments = filmsModel.commentsList.filter((comment) => film.comments.includes(String(comment.id)));
    this.#popupPresenter = new FilmPopupPresenter({
      film: this.#film,
      filmComments: this.#comments,
      onControlBtnClick: this.#handleControlButton,
      onDeleteComment: this.#handleDeleteComment
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

  #getUpdatedFilmByUserDetail(userDetail) {

    return {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        [userDetail]: !this.#film.userDetails[userDetail],
      }
    };
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  #handleControlButton = (userDetail) => {
    this.#handleUpdateFilm(this.#getUpdatedFilmByUserDetail(userDetail));
  };

  #handleDeleteComment = (updatedFilm) => {
    this.#handleUpdateFilm(
      USER_ACTION.DELETE_COMMENT,
      UPDATE_TYPE.PATCH,
      updatedFilm
    );
  };

}
