import { generateMovie } from '../mock/card';

export default class CardModel {
  #cards = Array.from({length: 12},generateMovie);
  get cards () {
    return this.#cards;
  }
}
