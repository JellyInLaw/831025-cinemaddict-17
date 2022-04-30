import { generateMovie } from '../mock/card';

export default class CardModel {
  cards = Array.from({length: 10},generateMovie);
  getCards = () => this.cards;
}
