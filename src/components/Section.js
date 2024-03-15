export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  rendererItems = () => {
    this._items.reverse().forEach((item) => {
      this.addItem(item);
    });
  };

  addItem = (data) => {
    const element = this._renderer(data);
    this._container.prepend(element);
  };
}
