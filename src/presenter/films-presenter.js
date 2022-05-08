import { render } from '../render';
import FilmDetailsView from '../view/film-details-view';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { comments } from '../mock/comments';
import CardModel from '../model/card-model';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {

  #cardModel = new CardModel;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

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
    const body = document.querySelector('.body');
    const cardComponent = new FilmCardView(card);
    const cardCommentsIds = card.comments;
    const commentsToRender = this.#getCardCommentsArr(cardCommentsIds);
    const filmDetailsView = new FilmDetailsView(card,commentsToRender);

    const onEscDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.removeChild(body.querySelector('.film-details'));
        body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscDown);
      }
    };

    cardComponent.element.addEventListener('click',() => {
      body.classList.add('hide-overflow');
      if (body.querySelector('.film-details')) {
        body.removeChild(body.querySelector('.film-details'));
      }
      document.addEventListener('keydown', onEscDown);
      render(filmDetailsView,body);
    });

    filmDetailsView.element.querySelector('.film-details__close-btn').addEventListener('click',() => {
      body.classList.remove('hide-overflow');
      body.removeChild(body.querySelector('.film-details'));
      document.removeEventListener('keydown', onEscDown);
    });
    render (cardComponent,component);
  };

  init = (filmsContainer,cardModel) => {

    this.cards = [...cardModel.cards];

    render(new FilmsView(),filmsContainer);
    const filmsComponent = this.#getFilmsContainer();

    for ( let i = 0 ; i < Math.min(this.cards.length,FILMS_COUNT_PER_STEP) ; i ++) {
      this.#renderCard(this.cards[i],filmsComponent);
    }

    if (this.cards.length > FILMS_COUNT_PER_STEP) {
      const placeForShowMoreButton = document.querySelector('.films-list');
      render(this.#showMoreButtonComponent,placeForShowMoreButton);
      this.#showMoreButtonComponent.element.addEventListener('click',this.#handleShowMoreButtonClick);

    }

  };
}

