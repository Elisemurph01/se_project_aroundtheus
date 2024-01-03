
function showInputError(formEl, inputEl, {inputErrorClass}) {
    const errorMessageEl = formEl.querySelector("#${inputEl.id}-error");
    inputEl.ClassList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.ClassList.add(errorClass);
};

function hideInputError(formEl, inputEl, {inputErrorClass}) {
    const errorMessageEl = formEl.querySelector("#${inputEl.id}-error");
    inputEl.ClassList.remove(inputErrorClass);
    errorMessageEl.textContent ="";
    errorMessageEl.ClassList.add(errorClass);
};

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
       return showInputError(formEl, inputEl, options);
    } 
        hideInputError(formEl, inputEl, options);
    
};

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);

};

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
    let foundInvalid = false;

    if (hasInvalidInput(inputEls)) {
        submitButton.ClassList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    }
        submitButton.ClassList.remove(inactiveButtonClass);
        submitButton.disabled = false;
};

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    const submitButton = formEl.querySelector(".modal__button");
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);

        });
    });
};

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        setEventListeners(formEl, options);
    });
};

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

enableValidation(config);