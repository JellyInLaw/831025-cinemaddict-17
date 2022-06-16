import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import dayjs from 'dayjs';
import { getRandomInteger } from '../utils';

const getDateForPopup = (date) => dayjs(date).format('DD MMMM YYYY');

const getValidRuntime = (runtime) => runtime > 60 ? `${Math.floor(runtime/60)} h ${runtime%60} m` : `${runtime} m`;

const isActive = (active) =>
  active
    ? 'film-details__control-button--active'
    :'';

const getCommentTemplate = (comment) => `
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:MM')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          `;

const getComments = (comments) => {
  const arr = [];
  comments.forEach(((element) => {
    arr.push(getCommentTemplate(element));
  }));
  return arr.join(arr);
};

const filmDetailsElement = (film,comments) =>`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${film.film_info.poster}" alt="">

          <p class="film-details__age">${film.film_info.age_rating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.film_info.title}</h3>
              <p class="film-details__title-original">${film.film_info.alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.film_info.total_rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.film_info.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.film_info.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.film_info.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getDateForPopup(film.film_info.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getValidRuntime(film.film_info.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.film_info.release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${film.film_info.genre[0]}</span>
                <span class="film-details__genre">${film.film_info.genre[1]}</span>
                <span class="film-details__genre">${film.film_info.genre[2]}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">${film.film_info.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isActive(film.user_details.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isActive(film.user_details.already_watched)}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isActive(film.user_details.favorite)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list">${getComments(comments)}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;

export default class FilmDetailsView extends AbstractStatefulView {
  constructor (film,comments) {
    super();
    this._state = film;
    this._state.commentsBody = comments;
    this.#setInnerHandlers();
  }

  #body = document.body;
  #popupScrollValue = 0;
  #checkedInputValue = 'smile';

  get template () {
    return filmDetailsElement(this._state,this._state.commentsBody);

  }

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'IMG') {
      return;
    }
    const emoji = this.element.querySelector('.film-details__add-emoji-label > IMG');
    emoji.src = evt.target.getAttribute('src');
    emoji.alt = evt.target.parentNode.getAttribute('for');
    const inputs = this.element.querySelectorAll('.film-details__emoji-item');
    inputs.forEach((input) => {
      if (input.checked) {
        input.removeAttribute('checked');
      }
    });
    inputs.forEach((input) => {
      if (input.id === emoji.alt) {
        input.setAttribute('checked','');
        this.#checkedInputValue = input.value;
      }
    });
  };

  #submitHandler = (evt) => {
    if (evt.code === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      const textArea = this.element.querySelector('.film-details__comment-input');
      const newComment = {
        id:getRandomInteger(1,9999),
        author: 'Ilya O\'Reilly',
        comment: textArea.value,
        date: new Date(),
        emotion: this.#checkedInputValue,
      };
      this._state.commentsBody.push(newComment);
      this._state.comments.push(newComment.id);
      this.updateElement(this._state);
      this.getScrollPopup();
    }
  };

  getScrollPopup = () => {
    this.element.scrollTo(0,this.#popupScrollValue);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click',this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown',this.#submitHandler);
    this.element.addEventListener('scroll',this.#scrollHandler);
  };

  #scrollHandler = () => {
    this.#popupScrollValue = this.element.scrollTop;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setClickWatchListHandler(this._callback.clickWatchlist);
    this.setClickIsWatchedHandler(this._callback.clickIsWatched);
    this.setClickMarkIsFavoriteHandler(this._callback.clickIsFavorite);
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  };

  setClickWatchListHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click',this.#clickWatchlistHandler);
  };

  setClickIsWatchedHandler = (callback) => {
    this._callback.clickIsWatched = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click',this.#clickIsWatchedHandler);
  };

  setClickMarkIsFavoriteHandler = (callback) => {
    this._callback.clickIsFavorite = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click',this.#clickIsFavoriteHandler);
  };

  #closeClickHandler = () => {
    this._callback.closeClick();
  };

  #clickWatchlistHandler = () => {
    this._callback.clickWatchlist();
  };

  #clickIsWatchedHandler = () => {
    this._callback.clickIsWatched();
  };

  #clickIsFavoriteHandler = () => {
    this._callback.clickIsFavorite();
  };
}
