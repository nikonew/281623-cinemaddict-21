import {generateFilms} from '../mock/mock.js';

const FILM_COUNT = 5;

export default class FilmsModel {
  films = Array.from({length: FILM_COUNT}, generateFilms);

  get filmsCard() {
    return this.films;
  }

}
