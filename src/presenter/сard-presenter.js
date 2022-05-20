import { render,remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmDetailsView from '../view/film-details-view';
import { comments } from '../mock/comments';

export default class CardPresenter {
  constructor (component,updateCard) {
    this.component = component;
    this.updateCard = updateCard;
  }

  #body = document.body;
  cardComponent = null;

  #getCardCommentsArr = (cardCommentsIds) => {
    const commentsArr = [];
    for (const commentId of cardCommentsIds) {
      for (const comment of comments) {
        if (commentId === comment.id) {
          commentsArr.push(comment);
        }
      }
    }
    return commentsArr;
  };

  #onEscDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.filmDetailsView);
      this.#body.classList.remove('hide-overflow');
      document.removeEventListener('keydown',this.#onEscDown);
    }
  };

  #handleClickCard = () => {
    const isPrevPopup = this.#body.querySelector('.film-details');

    if (isPrevPopup) {
      this.#body.removeChild(isPrevPopup);
    }

    this.filmDetailsView = new FilmDetailsView(this.card,this.commentsToRender);
    render(this.filmDetailsView,this.#body);
    this.filmDetailsView.setCloseClickHandler(this.#handleClickClosePopup);
    this.filmDetailsView.setClickWatchListHandler(this.#handleClickWatchList);
    this.filmDetailsView.setClickIsWatchedHandler(this.#handleClickIsWatched);
    this.filmDetailsView.setClickMarkIsFavorite(this.#handleClickMarkAsFavorite);
    this.#body.classList.add('hide-overflow');
    document.addEventListener('keydown',this.#onEscDown);

  };

  #handleClickClosePopup = () => {
    remove(this.filmDetailsView);
    this.#body.classList.remove('hide-overflow');
    document.removeEventListener('keydown',this.#onEscDown);
  };

  #handleClickWatchList = () => {
    if (this.card.user_details.watchlist) {
      this.card.user_details.watchlist = 0;
    } else {
      this.card.user_details.watchlist = 1;
    }
    this.updateCard(this.card);
  };

  #handleClickIsWatched = () => {
    if (this.card.user_details.already_watched) {
      this.card.user_details.already_watched = 0;
    } else {
      this.card.user_details.already_watched = 1;
    }
    this.updateCard(this.card);
  };

  #handleClickMarkAsFavorite = () => {
    if (this.card.user_details.favorite) {
      this.card.user_details.favorite = 0;
    } else {
      this.card.user_details.favorite = 1;
    }
    this.updateCard(this.card);
  };

  init = (card) => {
    this.card = card;
    const prevCardComponent = this.cardComponent;
    this.cardComponent = new FilmCardView(this.card);
    this.cardCommentsIds = card.comments;
    this.commentsToRender = this.#getCardCommentsArr(this.cardCommentsIds);

    if (prevCardComponent === null) {
      render(this.cardComponent,this.component);
    }

    if (prevCardComponent) {
      replace(this.cardComponent,prevCardComponent);
    }

    this.cardComponent.setClickHandler(this.#handleClickCard);
    this.cardComponent.setClickWatchListHandler(this.#handleClickWatchList);
    this.cardComponent.setClickIsWatchedHandler(this.#handleClickIsWatched);
    this.cardComponent.setClickMarkIsFavorite(this.#handleClickMarkAsFavorite);

    remove(prevCardComponent);
  };
}
