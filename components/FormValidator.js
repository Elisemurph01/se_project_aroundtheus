
export default class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = form;
    }

    _showInputError = (inputEl) => {
        const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        this._errorMessageEl.textContent = inputEl.validationMessage;
        this._errorMessageEl.classList.add(this._errorClass);
        
};

    _hideInputError = (inputEl) => {
        const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        this._errorMessageEl.classList.remove(this._errorClass);
        this._errorMessageEl.textContent = "";
};

    _checkInputValidity = (inputEl) => {
        this._errorMessageEl = this._formElement.querySelector(
            `#${inputEl.id}-error`
        );
        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    };

    _toggleButtonState = (inputEl) => {
        if (!this._hasInvalidInput(inputEl)) {
            this._submitButton.classList.disableSubmit;
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    };

    _hasInvalidInput = (inputEl) => {
        return inputEl.validity.valid;
    };


    resetValidation() {
        this._toggleButtonState();
        
        this._inputList.forEach((inputEl) => {
            this._hideInputError(inputEl)
          });
  }




    _setEventListeners() {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );

        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

        inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState(inputEl);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    disableSubmit() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute("disabled", true);
    }

    resetForm() {
        this._formElement.reset();
    }

}