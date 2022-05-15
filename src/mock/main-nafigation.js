export default class Filters {
  constructor (cardModel) {
    this.cards = cardModel.cards;
  }

  #getWatchlistCount = () => {
    let watchlistCount = 0;

    for (const card of this.cards) {
      if (card.user_details.watchlist) {
        watchlistCount ++;
      }
    }

    return watchlistCount;
  };

  #getHistoryCount = () => {
    let historyCount = 0;

    for (const card of this.cards) {
      if (card.user_details.already_watched) {
        historyCount ++;
      }
    }

    return historyCount;
  };

  #getFavoritesCount = () => {
    let favoritesCount = 0;

    for (const card of this.cards) {
      if (card.user_details.already_watched) {
        favoritesCount ++;
      }
    }

    return favoritesCount;
  };

  get filters () {
    return {
      wathclist: this.#getWatchlistCount(),
      history: this.#getHistoryCount(),
      favorites: this.#getFavoritesCount()
    };
  }
}
