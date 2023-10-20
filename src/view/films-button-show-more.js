import {createElement} from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';

function createButtonShowMoreTemplate () {
  return ('<button class="films-list__show-more">Show more</button>');
}

export default class ShowMoreButtonView extends AbstractView {
  #element = null;

  get template () {
    return createButtonShowMoreTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
