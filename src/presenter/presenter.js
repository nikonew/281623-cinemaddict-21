import {render} from '../framework/render.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListContainerView from '../view/films-list-container.js';
import FilmsListView from '../view/films-list.js';
import FilterFilmsView from '../view/filter-films.js';
import SortView from '../view/sort-films.js';
import HeaderProfileView from '../view/user-profile.js';

export default class Presenter {
  filmsListComponent = new FilmListContainerView;
  sort = new SortView();
  button = new ShowMoreButtonView();
  headerProfile = new HeaderProfileView();
  filter = new FilterFilmsView();

  constructor({ container, filmsModel, header }) {
    this.header = header;
    this.container = container;
    this.filmsModel = filmsModel;
  }

  init() {
    this.filmsList = [...this.filmsModel.filmsCard];

    render(this.filter, this.container);
    render(this.sort, this.container);


    for (let i = 0; i < this.filmsList.length; i++) {
      render(new FilmsListView({film: this.filmsList[i]}),this.filmsListComponent.element);
    }
    render(this.filmsListComponent, this.container);
    render(this.button, this.container);
    render(this.headerProfile, this.header);
  }
}
