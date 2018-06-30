document.componentRegistry = {};
document.nextId = 0;

export default class Component {
  constructor() {
    document.nextId += 1;
    this._id = document.nextId;
    document.componentRegistry[this._id] = this;
  }
}
