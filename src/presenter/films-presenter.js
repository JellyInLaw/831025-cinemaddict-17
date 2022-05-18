import { remove, render } from '../framework/render';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import ListEmptyView from '../view/list-empty-view';
import SortView from '../view/sort-view';
import CardPresenter from './сard-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  constructor (filmsContainer,cardModel) {
    this.filmsContainer = filmsContainer;
    this.cardModel = cardModel;
  }

  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #main = document.querySelector('.main');
  #body = document.querySelector('.body');

  #getFilmsContainer = () => document.querySelector('.films-list__container');

  #handleShowMoreButtonClick = () => {
    this.cards
      .slice(this.#renderedFilmsCount,this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card,this.#getFilmsContainer()));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.cards.length) {
      remove(this.#showMoreButtonComponent);
    }
  };


  #renderCard = (card,component) => {
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
        this.#renderCard(this.cards[i],filmsComponent);
      }

      if (this.cards.length > FILMS_COUNT_PER_STEP) {
        const placeForShowMoreButton = document.querySelector('.films-list');
        render(this.#showMoreButtonComponent,placeForShowMoreButton);
        this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }

  };
}
