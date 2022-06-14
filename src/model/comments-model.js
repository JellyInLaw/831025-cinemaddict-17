import { getComments } from '../mock/comments';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = getComments(100);
  get comments () {
    return this.#comments;
  }
}
