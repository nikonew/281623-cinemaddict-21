import {render} from './framework/render.js';
import FilterModel from './model/filters-model.js';
//import FilmsFiltersPresenter from './presenter/filters-presenter.js';
import Presenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';
import HeaderProfileView from './view/user-profile.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();


const presenter = new Presenter({
  header: headerElement,
  container: mainElement, filmsModel, filterModel
});

// const filtersPresenter = new FilmsFiltersPresenter({
//   filtersContainer: mainElement, filmsModel, filterModel,
// });
render(new HeaderProfileView(), headerElement);

//filtersPresenter.init();
presenter.init();

