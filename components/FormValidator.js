
export default class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = this.formElement;
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
        
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.classList.remove(this._errorClass);
        errorMessageEl.textContent ="";
    }

    _checkInputValidity(inputEl) {
            if (!inputEl.validity.valid) {
                this._showInputError(inputEl);
            } else {
                this._hideInputError(inputEl);
            }
    }

    _toggleButtonState(inputList, ) {
        if (!this._hasInvalidInput(inputEls)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._nactiveButtonClass);
            this._submitButton.disabled = false;
        }
        }

    _hasInvalidInput(inputList) {
        return this._inputEls.every((inputEl) => {
            return inputEl.validity.valid;
        });
    }

    _setEventListeners() {
        this._formEls = [this._document.querySelectorAll(this._formSelector)];
        this._formEls.forEach((formEl) => {
            this._formEl.addEventListener("submit", (e) => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
            setEventListeners(formEl);
        });
    }

    enableValidation() {
      
            this._formEl.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        
            _setEventListeners();
    }
}


const formValidationconfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__form-input_error",
    errorClass: "modal__error_visible"
};
