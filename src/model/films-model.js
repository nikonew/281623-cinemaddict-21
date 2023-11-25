import Observable from '../framework/observable.js';
import {mockComments} from '../mock/comments.js';
import {generateFilms} from '../mock/mock.js';

const FILM_COUNT = 6;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILM_COUNT}, generateFilms);
  #comments = mockComments;

  get filmsCard() {
    return this.#films;
  }

  updateFilms (updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  get commentsList () {
    return this.#comments;
  }
}
