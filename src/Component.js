document.componentRegistry = {};
document.nextId = 0;

export default class Component {
  constructor() {
    this._id = document.nextId += 1;
    document.componentRegistry[this._id] = this;
  }
}
