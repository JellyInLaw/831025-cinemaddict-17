import { createElement } from '../render';

const filmsElement = () =>`
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
</section>
`;

export default class FilmsView {
  #element = null;

  get template () {
    return filmsElement();
  }

  // getTemplate() {
  //   return filmsElement();
  // }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  // getElement() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }

  //   return this.element;
  // }

  removeElement() {
    this.#element = null;
  }
}
