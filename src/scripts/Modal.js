export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close = () => {
    this._modalElement.classList.remover("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", this.close);
    this._modalElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
