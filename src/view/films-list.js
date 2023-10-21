import {createElement} from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomInteger} from '../util.js';

function humanizeTimeFromTo(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}


function createFilmsList (film){
  const {filmInfo} = film;
  return (`
<div class="films-list__container">
  <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo.title}</h3>
            <p class="film-card__rating">${filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">1929</span>
              <span class="film-card__duration">1H 55m</span>
              <span class="film-card__genre">${filmInfo.genre}</span>
            </p>
            <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">${filmInfo.description}</p>
            <span class="film-card__comments">5 comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article></div>`);
}


export default class FilmsListView extends AbstractView{
  #element = null;
  #film = null;

  constructor({film}) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmsList(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
