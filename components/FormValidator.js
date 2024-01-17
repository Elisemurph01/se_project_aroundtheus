
export default class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._formElement = this.formElement;
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        this._errorMessageEl.textContent = inputEl.validationMessage;
        this._errorMessageEl.classList.add(this._errorClass);
        
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        this._errorMessageEl.classList.remove(this._errorClass);
        this._errorMessageEl.textContent = "";
    }

    _checkInputValidity = (inputEl) => {
        this._checkInputValidity = this.formElement.querySelector(`#${inputEl.id}-error`);

        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _toggleButtonState(inputList,) {
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

        this._toggleButtonState(inputList);
        inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState(inputList);
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    checkValidity() {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );
        inputList.forEach((inputEl) => {
            this._checkInputValidity(inputEl);
            this._toggleButtonState(inputList);
        });
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