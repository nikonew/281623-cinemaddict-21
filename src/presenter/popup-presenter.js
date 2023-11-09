import {isEscapeKey} from '../util.js';
import PopupFilmsView from '../view/popup-films.js';


export default class FilmPopupPresenter {
  #filmPopup = null;

  constructor({ film, filmComments, onControlBtnClick}) {
    this.#filmPopup = new PopupFilmsView({film, filmComments,
      onCloseClick: this.#closePopupClickHandler,onControlBtnClick,
    });
  }

  showPopup() {
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
