import { render,remove } from '../framework/render';
import CardPresenter from './сard-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class ShowMoreButtonPresenter {
  constructor (component,cards) {
    this.component = component;
    this.cards = cards;
  }

  #renderedFilmsCount;
  showMoreButtonComponent = new ShowMoreButtonView();
  #placeForShowMoreButton = document.querySelector('.films-list');

  #handleShowMoreButtonClick = () => {
    this.CardPresenter = new CardPresenter(this.component);
    this.cards
      .slice(this.#renderedFilmsCount,this.#renderedFilmsCount + this.FILMS_COUNT_PER_STEP)
      .forEach((card) => {
        this.CardPresenter.init(card);
      });

    this.#renderedFilmsCount += this.FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.cards.length) {
      remove(this.showMoreButtonComponent);
    }
  };

  init = (FILMS_COUNT_PER_STEP) => {
    this.FILMS_COUNT_PER_STEP = FILMS_COUNT_PER_STEP;
    this.#renderedFilmsCount = this.FILMS_COUNT_PER_STEP;
    render(this.showMoreButtonComponent,this.#placeForShowMoreButton);
    this.showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };
}
