
export default class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = form;
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        this._errorMessageEl.textContent = inputEl.validationMessage;
        this._errorMessageEl.classList.add(this._errorClass);
        
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        this._errorMessageEl.classList.remove(this._errorClass);
        this._errorMessageEl.textContent = "";
    }

    _checkInputValidity = (inputEl) => {
        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _toggleButtonState(inputEl) {
        if (!this._hasInvalidInput(inputEl)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    };

    _hasInvalidInput(inputList) {
        return this._inputEls.every((inputEl) => {
            return !inputEl.validity.valid;
        });
    };

    _setEventListeners() {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this.inputSelector)
        );

        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

      
        inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState(inputList);
            });
        });
    }

    enableValidation() {
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    enableValidation() {
        this._setEventListeners();
    }

    disableSubmit() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute("disabled", true);
    }

    formReset() {
        this.formElement.reset();
    }

}