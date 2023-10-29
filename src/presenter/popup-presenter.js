import {isEscapeKey} from '../util.js';
import PopupFilmsView from '../view/popup-films.js';


export default class FilmPopupPresenter {

  constructor({ film, filmComments }) {
    this.filmPopup = new PopupFilmsView({film, filmComments});
    this.closeBtn = this.filmPopup.element.querySelector('.film-details__close-btn');
  }

  showPopup() {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.filmPopup.element);
    this.closeBtn.addEventListener('click', this.closePopupClickHandler);
    document.addEventListener('keydown', this.escKeyDownHandler);
  }

  closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.filmPopup.element);
    this.closeBtn.removeEventListener('click', this.closePopupClickHandler);
    document.removeEventListener('keydown', this.escKeyDownHandler);
  }

  closePopupClickHandler = () => {
    this.closePopup();
  };

  escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.closePopup();
    }
  };


}
