import {  render } from '../framework/render';
import FilmsView from '../view/films-view';
import ListEmptyView from '../view/list-empty-view';
import SortView from '../view/sort-view';
import CardPresenter from './сard-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  constructor (filmsContainer,cardModel) {
    this.filmsContainer = filmsContainer;
    this.cardModel = cardModel;
  }

  #main = document.querySelector('.main');

  #getFilmsContainer = () => document.querySelector('.films-list__container');

  renderCard = (card,component) => {
    const cardPresenter = new CardPresenter(component);
    cardPresenter.init(card);
  };

  init = () => {

    this.cards = [...this.cardModel.cards];

    if (this.cards.length === 0) {
      render(new ListEmptyView(),this.filmsContainer);
    } else {
      render(new SortView(),this.#main);
      render(new FilmsView(),this.filmsContainer);
      const filmsComponent = this.#getFilmsContainer();

      for ( let i = 0 ; i < Math.min(this.cards.length,FILMS_COUNT_PER_STEP) ; i ++) {
        this.renderCard(this.cards[i],filmsComponent);
      }

      if (this.cards.length > FILMS_COUNT_PER_STEP) {
        const showMoreButton = new ShowMoreButtonPresenter(filmsComponent,this.cards);
        showMoreButton.init(FILMS_COUNT_PER_STEP);
      }
    }

  };
}
