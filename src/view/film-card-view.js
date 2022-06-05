import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

const createCardTemplate = (film) => {
  const title = film.film_info.title;
  const totalRating = film.film_info.total_rating;
  const releaseDate = dayjs(film.film_info.release.date).format('YYYY');
  const runtime = film.film_info.runtime > 60 ? `${Math.floor(film.film_info.runtime/60)}h ${film.film_info.runtime % 60}m`: `${film.film_info.runtime}m`;
  const genre = film.film_info.genre;
  const poster = film.film_info.poster;
  const description = film.film_info.description;
  const countComments = film.comments.length;
  const isWatchlist = film.user_details.watchlist ? 'film-card__controls-item--active' : '';
  const isAlreadyWatched = film.user_details.already_watched ? 'film-card__controls-item--active' : '';
  const isFavorite = film.user_details.favorite ? 'film-card__controls-item--active' : '';

  return (`<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${countComments} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatched}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
  </div>
</article>`);
};

export default class FilmCardView extends AbstractView {
  constructor (film) {
    super();
    this.film = film;
  }

  get template () {
    return createCardTemplate(this.film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#clickHandler);
  };

  setClickWatchListHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click',this.#clickWatchlistHandler);
  };

  setClickIsWatchedHandler = (callback) => {
    this._callback.clickIsWatched = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click',this.#clickIsWatchedHandler);
  };

  setClickMarkIsFavorite = (callback) => {
    this._callback.clickIsFavorite = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click',this.#clickIsFavoriteHandler);
  };

  #clickHandler = () => {
    this._callback.click();
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
