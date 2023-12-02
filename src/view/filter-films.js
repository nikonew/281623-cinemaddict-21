import AbstractStatefulView from '../framework/view/abstract-view.js';


function createFilterTemplate (state, currentFilterType) {
  return `<nav class="main-navigation">
    <a href="#all" data-id="all" class="main-navigation__item ${state.all.type === currentFilterType ? 'main-navigation__item--active' : ''}">${state.all.name}</a>
    <a href="#watchlist" data-id="watchlist" class="main-navigation__item ${state.watchlist.type === currentFilterType ? 'main-navigation__item--active' : ''}">${state.watchlist.name} <span class="main-navigation__item-count">${state.watchlist.films.length}</span></a>
    <a href="#history" data-id="history" class="main-navigation__item ${state.history.type === currentFilterType ? 'main-navigation__item--active' : ''}">${state.history.name} <span class="main-navigation__item-count">${state.history.films.length}</span></a>
    <a href="#favorites" data-id="favorites" class="main-navigation__item ${state.favorites.type === currentFilterType ? 'main-navigation__item--active' : ''}">${state.favorites.name} <span class="main-navigation__item-count">${state.favorites.films.length}</span></a>
  </nav>`;
}

export default class FilterFilmsView extends AbstractStatefulView {
  #handleFilterTypeChange = null;
  #currentFilter = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this._state = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this._state, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    const filter = evt.target.closest('.main-navigation__item');
    if (filter && !filter.classList.contains('main-navigation__item--active')) {
      this.#handleFilterTypeChange(filter.dataset.id);
    }
  };

}
