import {DATA_FORMAT} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getTimeFromMin, humanizeFilmsDueDate} from '../util.js';


function createFilmsCard (film){
  const {filmInfo, userDetails} = film;
  const { duration} = film.filmInfo;
  const { date } = film.filmInfo.release;
  return (`
  <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo.title}</h3>
            <p class="film-card__rating">${filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeFilmsDueDate(date, DATA_FORMAT.FILMS_CARD)}</span>
              <span class="film-card__duration">${getTimeFromMin(duration)}</span>
              <span class="film-card__genre">${filmInfo.genre[2]}</span>
            </p>
            <img src="${filmInfo.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${filmInfo.description}</p>
            <span class="film-card__comments">5 comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" data-user-detail="watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" data-user-detail="alreadyWatched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" data-user-detail="favorite" type="button">Mark as favorite</button>
          </div>
        </article>`);
}


export default class FilmsCardView extends AbstractStatefulView{
  #film = null;
  #handleClick = null;
  #handleControlButtonClick = null;


  constructor({film,onClick, onControlBtnClick}) {
    super();
    this.#film = film;
    this.#handleClick = onClick;
    this.#handleControlButtonClick = onControlBtnClick;
    this._restoreHandlers();
  }

  get template() {
    return createFilmsCard(this.#film);
  }

  _restoreHandlers() {
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlButtonsClickHandler);
  }

  #clickHandler = () => {
    this.#handleClick();
  };

  #controlButtonsClickHandler = (evt) => {
    if (evt.target.classList.contains('film-card__controls-item')) {
      this.#handleControlButtonClick(evt.target.dataset.userDetail);
    }
  };

}
