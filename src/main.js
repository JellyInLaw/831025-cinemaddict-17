import ProfileRatingElement from './view/profile-rating-view';
import MainNavigationElement from './view/main-navigation-view';
import SortElement from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';
import { render } from './render';
import FilmsPresenter from './presenter/films-presenter';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(new ProfileRatingElement(),header);
render(new MainNavigationElement(),main);
render(new SortElement(),main);

const filmsPresenter = new FilmsPresenter();

filmsPresenter.init(main);

render(new FooterStatisticsView(),footer);
