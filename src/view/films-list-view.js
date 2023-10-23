import {createElement} from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';


function createFilmsList() {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
}

export default class FilmListView extends AbstractView{
  #element = null;

  get template () {
    return createFilmsList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
