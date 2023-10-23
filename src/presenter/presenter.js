import {render} from '../framework/render.js';
import ShowMoreButtonView from '../view/films-button-show-more.js';
import FilmListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsCardView from '../view/films-card-view.js';
import FilmsView from '../view/films-view.js';
import FilterFilmsView from '../view/filter-films.js';
import SortView from '../view/sort-films.js';
import HeaderProfileView from '../view/user-profile.js';

export default class Presenter {
  filmsView = new FilmsView();
  filmsListComponent = new FilmListView;
  sort = new SortView();
  filmsListTemplate = new FilmsListContainerView();
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
      render(new FilmsCardView({film: this.filmsList[i]}),this.filmsListTemplate.element);
    }
    render(this.filmsView, this.container);
    render(this.filmsListComponent, this.filmsView.element);
    render(this.filmsListTemplate, this.filmsListComponent.element);
    render(this.button, this.filmsListComponent.element);
    render(this.headerProfile, this.header);
  }
}
