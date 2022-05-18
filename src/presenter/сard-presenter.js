import { render,remove } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmDetailsView from '../view/film-details-view';
import { comments } from '../mock/comments';

export default class CardPresenter {
  constructor (component) {
    this.component = component;
  }

  #body = document.querySelector('.body');

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
    this.#body.classList.add('hide-overflow');
    if (this.#body.querySelector('.film-details')) {
      remove(this.filmDetailsView);
    }
    render(this.filmDetailsView,this.#body);
    document.addEventListener('keydown',this.#onEscDown);
  };

  #handleClickClosePopup = () => {
    remove(this.filmDetailsView);
    this.#body.classList.remove('hide-overflow');
    document.removeEventListener('keydown',this.#onEscDown);
  };

  init = (card) => {
    this.card = card;
    this.cardComponent = new FilmCardView(this.card);
    this.cardCommentsIds = card.comments;
    this.commentsToRender = this.#getCardCommentsArr(this.cardCommentsIds);
    this.filmDetailsView = new FilmDetailsView(this.card,this.commentsToRender);

    render(this.cardComponent,this.component);
    this.cardComponent.setClickHandler(this.#handleClickCard);
    this.filmDetailsView.setCloseClickHandler(this.#handleClickClosePopup);
  };
}
