import { render,remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmDetailsView from '../view/film-details-view';
import { PopupMode, UpdateType, UserAction } from '../utils';

export default class CardPresenter {
  constructor (component,updateCard,popupModeChange,comments) {
    this.component = component;
    this.updateCard = updateCard;
    this.popupModeChange = popupModeChange;
    this.comments = comments;
  }

  #body = document.body;
  cardComponent = null;
  popupMode = PopupMode.CLOSE;

  #getCardCommentsArr = (cardCommentsIds) => {
    const commentsArr = [];
    for (const commentId of cardCommentsIds) {
      for (const comment of this.comments) {
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
      this.#body.classList.remove('hide-overflow');
      this.closePopup();
    }
  };

  renderPopup = () => {
    this.popupModeChange();
    this.filmDetailsView = new FilmDetailsView(this.card,this.commentsToRender);
    render(this.filmDetailsView,this.#body);
    this.popupMode = PopupMode.OPEN;
    this.filmDetailsView.setCloseClickHandler(this.#handleClickClosePopup);
    this.filmDetailsView.setClickWatchListHandler(this.#handleClickWatchList);
    this.filmDetailsView.setClickIsWatchedHandler(this.#handleClickIsWatched);
    this.filmDetailsView.setClickMarkIsFavoriteHandler(this.#handleClickMarkAsFavorite);
    this.#body.classList.add('hide-overflow');
    document.addEventListener('keydown',this.#onEscDown);
  };

  #handleClickCard = () => {
    this.renderPopup();
  };

  #handleClickClosePopup = () => {
    remove(this.filmDetailsView);
    this.popupMode = PopupMode.CLOSE;
    this.#body.classList.remove('hide-overflow');
    document.removeEventListener('keydown',this.#onEscDown);
  };

  #handleClickWatchList = () => {
    // this.card.user_details.watchlist = !this.card.user_details.watchlist;
    // this.updateCard(this.card);
    this.card.user_details.watchlist = !this.card.user_details.watchlist;
    this.updateCard(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      this.card
    );
  };

  #handleClickIsWatched = () => {
    // this.card.user_details.already_watched = !this.card.user_details.already_watched;
    // this.updateCard(this.card);
    this.card.user_details.already_watched = !this.card.user_details.already_watched;
    this.updateCard(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      this.card
    );
  };

  #handleClickMarkAsFavorite = () => {
    // this.card.user_details.favorite = !this.card.user_details.favorite;
    // this.updateCard(this.card);
    this.card.user_details.favorite = !this.card.user_details.favorite;
    this.updateCard(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      this.card
    );
  };

  closePopup = () => {
    this.popupMode = PopupMode.CLOSE;
    remove(this.filmDetailsView);
    document.removeEventListener('keydown',this.#onEscDown);
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

    if (this.popupMode === PopupMode.OPEN) {
      this.renderPopup();
    }

    remove(prevCardComponent);
  };

  destroy = () => {
    remove(this.cardComponent);
  };
}
