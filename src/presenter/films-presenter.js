import { render } from '../render';
import FilmDetailsView from '../view/film-details-view';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { comments } from '../mock/comments';
import ListEmptyView from '../view/list-empty-view';
import SortView from '../view/sort-view';

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

  #getCardCommentsArr = (cardCommentsIds) => {
    const commentsArr = [];
    for (let i = 0 ; i < cardCommentsIds.length ; i ++) {
      for (let j = 0 ; j < comments.length ; j ++) {
        if (cardCommentsIds[i] === comments[j].id) {
          commentsArr.push(comments[j]);
        }
      }
    }
    return commentsArr;
  };

  #getFilmsContainer = () => document.querySelector('.films-list__container');

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.cards
      .slice(this.#renderedFilmsCount,this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card,this.#getFilmsContainer()));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.cards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };


  #renderCard = (card,component) => {

    const cardComponent = new FilmCardView(card);
    const cardCommentsIds = card.comments;
    const commentsToRender = this.#getCardCommentsArr(cardCommentsIds);
    const filmDetailsView = new FilmDetailsView(card,commentsToRender);

    const onEscDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#body.removeChild(this.#body.querySelector('.film-details'));
        this.#body.classList.remove('hide-overflow');
        document.removeEventListener('keydown',onEscDown);
      }
    };

    const handleClickCard = () => {
      this.#body.classList.add('hide-overflow');
      if (this.#body.querySelector('.film-details')) {
        this.#body.removeChild(this.#body.querySelector('.film-details'));
      }
      render(filmDetailsView,this.#body);
      document.addEventListener('keydown',onEscDown);
    };

    const handleClickClosePopup = () => {
      this.#body.removeChild(this.#body.querySelector('.film-details'));
      document.removeEventListener('keydown',onEscDown);
    };

    render (cardComponent,component);

    cardComponent.addClickEvent(handleClickCard);

    filmDetailsView.addCloseEvent(handleClickClosePopup);
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
        this.#showMoreButtonComponent.element.addEventListener('click',this.#handleShowMoreButtonClick);
      }
    }

  };
}
