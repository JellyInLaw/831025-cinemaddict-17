import ProfileRatingElement from './view/profile-rating-view';
import MainNavigationElement from './view/main-navigation-view';
import { render } from './render';

const header = document.querySelector('.header');
const main = document.querySelector('.main');

render(new ProfileRatingElement(),header);
render(new MainNavigationElement(),main);
