import { createElement } from '../render';

const filmsListContainerElement = () =>'<div class="films-list__container"></div>';

export default class FilmsListContainerElement {
  getTemplate() {
    return filmsListContainerElement();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
