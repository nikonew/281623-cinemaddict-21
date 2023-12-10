import Observable from '../framework/observable.js';
import {mockComments} from '../mock/comments.js';


export default class CommentsModel extends Observable {
  #comments = mockComments;

  get comments () {
    return this.#comments;
  }

  addComments(updateType, update) {
    update.comments = {...update.comments,
      id: this.comments.findIndex((comments) =>comments.id === update.id),
      author: 'Василий',
      date: new Date()
    };

    this.#comments.get(update.id).push(update.comments);
    this._notify(updateType, update);
  }

  deleteComments(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

}
