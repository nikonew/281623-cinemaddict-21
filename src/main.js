import {render} from './framework/render.js';
import Presenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';
import HeaderProfileView from './view/user-profile.js';

const headerElement = document.querySelector('header');
const mainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();


const presenter = new Presenter({
  header: headerElement,
  container: mainElement, filmsModel,
});

render(new HeaderProfileView(), headerElement);


presenter.init();
