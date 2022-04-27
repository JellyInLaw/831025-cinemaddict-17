import { createElement } from '../render';

const filmsElement = () =>'<section class="films"></section>';

export default class FilmsElement {
  getTemplate() {
    return filmsElement();
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
