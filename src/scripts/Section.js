export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  rendererItems = () => {
    this._items.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  };

  addItem = (element) => {
    this._container.prepend(element);
  };
}
