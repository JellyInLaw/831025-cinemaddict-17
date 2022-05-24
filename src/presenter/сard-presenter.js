import { render,remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmDetailsView from '../view/film-details-view';
import { comments } from '../mock/comments';

const popupMode = {OPEN: 'open',CLOSE: 'close'};

export default class CardPresenter {
  constructor (component,updateCard,popupModeChange) {
    this.component = component;
    this.updateCard = updateCard;
    this.popupModeChange = popupModeChange;
  }

  #body = document.body;
  cardComponent = null;
  popupMode = popupMode.CLOSE;

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

  #renderPopup = () => {

    this.popupModeChange();

    this.filmDetailsView = new FilmDetailsView(this.card,this.commentsToRender);

    render(this.filmDetailsView,this.#body);

    this.popupMode = popupMode.OPEN;

    this.filmDetailsView.setCloseClickHandler(this.#handleClickClosePopup);
    this.filmDetailsView.setClickWatchListHandler(this.#handleClickWatchList);
    this.filmDetailsView.setClickIsWatchedHandler(this.#handleClickIsWatched);
    this.filmDetailsView.setClickMarkIsFavorite(this.#handleClickMarkAsFavorite);
    this.#body.classList.add('hide-overflow');
    document.addEventListener('keydown',this.#onEscDown);
  };

  #handleClickCard = () => {
    this.#renderPopup();
  };

  #handleClickClosePopup = () => {
    remove(this.filmDetailsView);
    this.popupMode = popupMode.CLOSE;
    this.#body.classList.remove('hide-overflow');
    document.removeEventListener('keydown',this.#onEscDown);
  };

  #handleClickWatchList = () => {

    this.card.user_details.watchlist = !this.card.user_details.watchlist;

    this.updateCard(this.card);

    if (this.popupMode === popupMode.OPEN) {
      this.#renderPopup();
    }
  };

  #handleClickIsWatched = () => {

    this.card.user_details.already_watched = !this.card.user_details.already_watched;

    this.updateCard(this.card);

    if (this.popupMode === popupMode.OPEN) {
      this.#renderPopup();
    }
  };

  #handleClickMarkAsFavorite = () => {

    this.card.user_details.favorite = !this.card.user_details.favorite;

    this.updateCard(this.card);

    if (this.popupMode === popupMode.OPEN) {
      this.#renderPopup();
    }
  };

  closePopup = () => {
    if (this.popupMode !== popupMode.CLOSE) {
      remove(this.filmDetailsView);
    }
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

  destroy = () => {
    remove(this.cardComponent);
  };
}
