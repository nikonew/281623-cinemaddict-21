import {render} from './framework/render.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filters-model.js';
import Presenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';
import HeaderProfileView from './view/user-profile.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();


const presenter = new Presenter({
  header: headerElement,
  container: mainElement, filmsModel, filterModel, commentsModel
});


render(new HeaderProfileView(), headerElement);


presenter.init();

