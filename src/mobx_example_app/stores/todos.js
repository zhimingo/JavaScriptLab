import { makeObservable } from 'mobx';

class ToDoStore {
  todos = [];

  constructor() {
    makeObservable(this);
  }
}

export default new ToDoStore();
