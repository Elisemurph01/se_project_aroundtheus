import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(
    modalSelector,
    handleFormSubmit,
    { formSelector, submitButtonSelector }
  ) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [
      ...this._modalForm.querySelectorAll(".modal__form-input"),
    ];
    this._button = this._modalElement.querySelector(submitButtonSelector);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
    super.setEventListeners();
  }
}
