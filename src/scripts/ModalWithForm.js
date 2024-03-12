import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(
    modalSelector,
    handleFormSubmit,
    { formSelector, submitButtonSelctor }
  ) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._modalElement.querySelector("submitButtonSelector");
  }

  close() {
    this._modalForm.reset();
    super.close();
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
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  }
}
