import { render,remove,RenderPosition} from '../framework/render';
import FilmsView from '../view/films-view';
import ListEmptyView from '../view/list-empty-view';
import SortView from '../view/sort-view';
import CardPresenter from './сard-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import { PopupMode } from '../utils';
import { SortType,SortBy} from '../utils';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  constructor (filmsContainer,cardModel) {
    this.filmsContainer = filmsContainer;
    this.cardModel = cardModel;
  }

  #main = document.querySelector('.main');
  #renderedFilmsCount;
  #showMoreButtonComponent = new ShowMoreButtonView();
  allCardPresenters = new Map();
  sortView = new SortView();
  currentSortType = SortType.DEFAULT;
  sourcedCards = [];
  sortedCards = [];

  #getFilmsContainer = () => document.querySelector('.films-list__container');

  #handleShowMoreButtonClick = () => {
    this.cards
      .slice(this.#renderedFilmsCount,this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => {
        this.renderCard(card,this.#getFilmsContainer());
      });

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.cards.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  updateCard = (updatedCard) => {
    this.allCardPresenters.get(updatedCard.id).init(updatedCard);
  };

  renderCard = (card,component) => {
    const cardPresenter = new CardPresenter(component,this.updateCard,this.handlePopupModeChange);
    cardPresenter.init(card);
    this.allCardPresenters.set(card.id,cardPresenter);
  };

  handlePopupModeChange = () => {
    this.allCardPresenters.forEach((presenter) => {
      if (presenter.popupMode !== PopupMode.CLOSE) {
        presenter.closePopup();
      }
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (this.currentSortType === sortType) {
      return;
    }
    if (sortType !== SortType.DEFAULT) {
      const sort = SortBy[sortType];
      this.sortedCards = sort(this.cards);
    }
    this.destroy();
    this.currentSortType = sortType;
    this.init();
  };

  renderSort = () => {
    render(this.sortView,this.#main);
    this.sortView.setSortTypeHandler(this.#handleSortTypeChange);
  };

  init = () => {

    if (this.currentSortType === SortType.DEFAULT) {
      this.cards = [...this.cardModel.cards];
    }

    if (this.currentSortType === SortType.DATE) {
      this.cards = this.sortedCards;
    }

    this.sourcedCards = [...this.cardModel.cards];

    if (this.cards.length === 0) {
      render(new ListEmptyView(),this.filmsContainer);
    } else {
      this.renderSort();
      this.filmsComponent = new FilmsView();
      render(this.filmsComponent,this.filmsContainer,RenderPosition.AFTEREND);
      const filmsComponent = this.#getFilmsContainer();

      for ( let i = 0 ; i < Math.min(this.cards.length,FILMS_COUNT_PER_STEP) ; i ++) {
        this.renderCard(this.cards[i],filmsComponent);
      }

      if (this.cards.length > FILMS_COUNT_PER_STEP) {
        this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
        const placeForShowMoreButton = document.querySelector('.films-list');
        render(this.#showMoreButtonComponent,placeForShowMoreButton);
        this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };

  destroy = () => {
    remove(this.filmsComponent);
  };
}

