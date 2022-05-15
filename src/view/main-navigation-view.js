import AbstractView from '../framework/view/abstract-view';

const mainNavigationElement = (wathclist,history,favorites) =>`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${wathclist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
  </nav>`;

export default class MainNavigationView extends AbstractView {
  constructor (filters) {
    super();
    this.filters = filters.filters;
    this.wathclist = this.filters.wathclist;
    this.history = this.filters.history;
    this.favorites = this.filters.favorites;
  }

  get template () {
    return mainNavigationElement(this.wathclist,this.history,this.favorites);
  }
}
