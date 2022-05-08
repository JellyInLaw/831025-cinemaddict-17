import { generateMovie } from '../mock/card';

export default class CardModel {
  #cards = Array.from({length: 7},generateMovie);
  get cards () {
    return this.#cards;
  }
}
