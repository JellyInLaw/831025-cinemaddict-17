import { createElement } from '../render';

const showMoreButtonElement = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonElement {
  getTemplate() {
    return showMoreButtonElement();
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
