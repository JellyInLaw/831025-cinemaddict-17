import ProfileRatingElement from './view/profile-rating-view';
import { render } from './render';

const header = document.querySelector('.header');

render(new ProfileRatingElement(),header);
