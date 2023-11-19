import {SORT_TYPE} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createSortTemplate (currentSortType){
  return` <ul class="sort">
      <li>
        <a href="#" class="sort__button ${currentSortType === SORT_TYPE.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a>
      </li>
      <li>
        <a href="#" class="sort__button ${currentSortType === SORT_TYPE.DATE ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a>
      </li>
      <li>
        <a href="#" class="sort__button ${currentSortType === SORT_TYPE.RATING ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a>
      </li>
    </ul>`;
}

export default class SortView extends AbstractStatefulView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
