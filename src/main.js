import {render} from './framework/render.js';
import Presenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';
import FilterFilmsView from './view/filter-films.js';
import SortView from './view/sort-films.js';


const headerElement = document.querySelector('header');
const mainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();

const presenter = new Presenter({
  header: headerElement,
  container: mainElement, filmsModel,
});

render(new FilterFilmsView(), mainElement);
render(new SortView(), mainElement);


presenter.init();
