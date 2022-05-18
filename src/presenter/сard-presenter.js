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
    if (this.#body.querySelector('.film-details')) {
      this.#body.removeChild(this.#body.querySelector('.film-details'));
    }

    this.filmDetailsView = new FilmDetailsView(this.card,this.commentsToRender);
    render(this.filmDetailsView,this.#body);
    this.filmDetailsView.setCloseClickHandler(this.#handleClickClosePopup);
    this.#body.classList.add('hide-overflow');
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

    render(this.cardComponent,this.component);
    this.cardComponent.setClickHandler(this.#handleClickCard);

  };
}
