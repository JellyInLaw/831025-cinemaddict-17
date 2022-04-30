import { generateMovie } from '../mock/card';

export default class CardModel {
  cards = Array.from({length: 3},generateMovie);
  getCards = () => this.cards;
}
