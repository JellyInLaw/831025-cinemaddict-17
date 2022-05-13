import ProfileRatingElement from './view/profile-rating-view';
import MainNavigationElement from './view/main-navigation-view';
import FooterStatisticsView from './view/footer-statistics-view';
import { render } from './framework/render';
import FilmsPresenter from './presenter/films-presenter';
import CardModel from './model/card-model';
import Filters from './mock/main-nafigation';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const cardModel = new CardModel();
render(new ProfileRatingElement(),header);
const filters = new Filters(cardModel);
render(new MainNavigationElement(filters),main);

const filmsPresenter = new FilmsPresenter(main,cardModel);

filmsPresenter.init();

render(new FooterStatisticsView(),footer);


