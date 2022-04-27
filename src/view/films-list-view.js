import { createElement } from '../render';

const filmsListElement = () => `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;

export default class FilmsListElement {
  getTemplate() {
    return filmsListElement();
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
