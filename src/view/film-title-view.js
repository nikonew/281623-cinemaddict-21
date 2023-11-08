import AbstractView from '../framework/view/abstract-view.js';

const createEmptyFilmListTemplate = (filmFilters, activeFilter) => `<h2 class="films-list__title">${filmFilters[activeFilter].emptyFilmsMessage}</h2>`;

export default class FilmTitleView extends AbstractView {
  #filmFilters = null;
  #activeFilter = null;

  constructor(filmFilters, activeFilter) {
    super();
    this.#filmFilters = filmFilters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createEmptyFilmListTemplate(this.#filmFilters, this.#activeFilter);
  }

}
