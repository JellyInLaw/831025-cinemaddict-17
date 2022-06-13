import { generateMovie } from '../mock/card';
import Observable from '../framework/observable';

export default class CardModel extends Observable {
  #cards = Array.from({length: 7},generateMovie);
  get cards () {
    return this.#cards;
  }
}
