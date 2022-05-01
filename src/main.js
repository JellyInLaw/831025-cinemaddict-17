import ProfileRatingElement from './view/profile-rating-view';
import MainNavigationElement from './view/main-navigation-view';
import SortElement from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';
import { render } from './render';
import FilmsPresenter from './presenter/films-presenter';
import CardModel from './model/card-model';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(new ProfileRatingElement(),header);
render(new MainNavigationElement(),main);
render(new SortElement(),main);

const cardModel = new CardModel();

const filmsPresenter = new FilmsPresenter();

filmsPresenter.init(main,cardModel);

render(new FooterStatisticsView(),footer);


