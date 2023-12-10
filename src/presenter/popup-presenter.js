import {isEscapeKey} from '../util.js';
import PopupFilmsView from '../view/popup-films.js';


export default class FilmPopupPresenter {
  #filmPopup = null;
  #film = null;
  #filmComments = null;

  #handleControlButton = null;
  #handleDeleteComment = null;

  constructor({ film, filmComments, onControlBtnClick, handleDeleteComment }) {
    this.#film = film;
    this.#filmComments = filmComments;
    this.#handleControlButton = onControlBtnClick;
    this.#handleDeleteComment = handleDeleteComment;

  }

  showPopup() {
    this.#filmPopup = new PopupFilmsView({
      film: this.#film,
      filmComments: this.#filmComments,
      onCloseClick: this.#closePopupClickHandler,
      onControlBtnClick:this.#handleControlButton,
      onDeleteComment: this.#handleDeleteComment
    });
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmPopup.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#filmPopup.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopupClickHandler = () => {
    this.#closePopup();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closePopup();
    }
  };


}
