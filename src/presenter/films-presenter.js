import { render } from '../render';
import FilmDetailsView from '../view/film-details-view';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { comments } from '../mock/comments';
import CardModel from '../model/card-model';

export default class FilmsPresenter {

  cardModel = new CardModel;

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

  #renderCard = (card,component) => {
    const body = document.querySelector('.body');
    const cardComponent = new FilmCardView(card);
    const cardCommentsIds = card.comments;
    const commentsToRender = this.#getCardCommentsArr(cardCommentsIds);
    const filmDetailsView = new FilmDetailsView(card,commentsToRender);

    cardComponent.element.addEventListener('click',() => {
      body.classList.add('hide-overflow');
      if (body.querySelector('.film-details')) {
        body.removeChild(body.querySelector('.film-details'));
      }
      render(filmDetailsView,body);
    });

    filmDetailsView.element.querySelector('.film-details__close-btn').addEventListener('click',() => {
      body.classList.remove('hide-overflow');
      body.removeChild(body.querySelector('.film-details'));
    });

    render (cardComponent,component);
  };

  init = (filmsContainer,cardModel) => {

    this.cards = [...cardModel.cards];

    render(new FilmsView(),filmsContainer);
    const filmsComponent = document.querySelector('.films-list__container');

    for (let i = 0 ; i < this.cards.length ; i++) {
      this.#renderCard(this.cards[i],filmsComponent);
    }

    const placeForShowMoreButton = document.querySelector('.films-list');
    render(new ShowMoreButtonView(),placeForShowMoreButton);
  };
}

