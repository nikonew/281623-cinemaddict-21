import {mockComments} from '../mock/comments.js';
import {generateFilms} from '../mock/mock.js';

const FILM_COUNT = 6;

export default class FilmsModel {
  #films = Array.from({length: FILM_COUNT}, generateFilms);
  #comments = mockComments;

  get filmsCard() {
    return this.#films;
  }

  get commentsList () {
    return this.#comments;
  }
}
