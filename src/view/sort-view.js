import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../utils';

const sortElement = () =>`<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.RATING}>Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView {
  get template () {
    return sortElement();
  }

  #sortType = SortType.DEFAULT;

  makeActiveButton = (sortType) => {
    const links = this.element.querySelectorAll('.sort__button');
    links.forEach((elem) => {
      elem.classList.remove('sort__button--active');
      if (elem.dataset.sortType === sortType) {
        elem.classList.add('sort__button--active');
      }
    });
  };

  setSortTypeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click',this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.#sortType = evt.target.dataset.sortType;
    this.makeActiveButton(this.#sortType);
  };
}
