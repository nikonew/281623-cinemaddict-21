import AbstractView from '../framework/view/abstract-view.js';


function createFilmsCard (film){
  const {filmInfo, userDetails} = film;
  return (`
  <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo.title}</h3>
            <p class="film-card__rating">${filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">1929</span>
              <span class="film-card__duration">1H 55m</span>
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


export default class FilmsCardView extends AbstractView{
  #film = null;
  #handleClick = null;
  #handleControlButtonClick = null;


  constructor({film,onClick, onControlBtnClick}) {
    super();
    this.#film = film;
    this.#handleClick = onClick;
    this.#handleControlButtonClick = onControlBtnClick;


    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlButtonsClickHandler);
  }

  get template() {
    return createFilmsCard(this.#film);
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
