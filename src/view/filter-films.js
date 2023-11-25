import AbstractStatefulView from '../framework/view/abstract-view.js';


function createFilterTemplate (filters, currentFilterType) {
  return `<nav class="main-navigation">
    <a href="#all" data-id="all" class="main-navigation__item main-navigation__item--active ${filters.all.type === currentFilterType ? 'main-navigation__item--active' : ''}">${filters.all.name}</a>
    <a href="#watchlist" data-id="watchlist" class="main-navigation__item ${filters.watchlist.type === currentFilterType ? 'main-navigation__item--active' : ''}">${filters.watchlist.name} <span class="main-navigation__item-count">${filters.watchlist.films.length}</span></a>
    <a href="#history" data-id="history" class="main-navigation__item ${filters.history.type === currentFilterType ? 'main-navigation__item--active' : ''}">${filters.history.name} <span class="main-navigation__item-count">${filters.history.films.length}</span></a>
    <a href="#favorites" data-id="favorites" class="main-navigation__item ${filters.favorites.type === currentFilterType ? 'main-navigation__item--active' : ''}">${filters.favorites.name} <span class="main-navigation__item-count">${filters.favorites.films.length}</span></a>
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
