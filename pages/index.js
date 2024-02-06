import FormValidator from "../components/FormValidator.js";
import Card from "../components/card.js";

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
    }
]

const cardData =     {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
}


/* ELEMENTS */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector("#modal-close-button");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector('#add-modal-close-button');
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview__image-modal");
const previewImageTitle = document.querySelector(".modal__image-title");
const previewImageCloseButton = document.querySelector("#image-close-modal");
const previewImage = document.querySelector(".modal__image");

const formValidationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__form-input_error",
    errorClass: "modal__error_visible"
};

const profileEditFormValidator = new FormValidator(formValidationConfig, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formValidationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

/* FUNCTIONS */

function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalbyEscape);
    modal.removeEventListener("mousedown", closeModalOutsideClick);
 
}

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalbyEscape);
    modal.addEventListener("mousedown", closeModalOutsideClick);
}

function closeModalbyEscape(evt) {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".modal_opened");
        closePopup(openedModal);
    }
}
  
function closeModalOutsideClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.cards__image');
    const cardTitleEl = cardElement.querySelector('.cards__title');
    const likeButton = cardElement.querySelector(".cards__like-button");
    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("cards__like-button_active");
    });

    const trashButton = cardElement.querySelector(".cards__trash-button");
    trashButton.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        previewImage.setAttribute("src", cardData.link);
        previewImageModal.setAttribute("alt", cardData.name);
        previewImageTitle.textContent = cardData.name;
        openModal(previewImageModal);
    });

    return cardElement;
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
}

function renderCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    const renderNewCard = card.generateCard();
    cardListEl.prepend(renderNewCard);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const cardTitleInput = addCardFormElement.querySelector("#modal-add-form-input");
    const cardUrlInput = addCardFormElement.querySelector("#modal-form-url-input");
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link });
    addCardFormElement.reset();
    closePopup(addCardModal);
}

function handleImageClick(cardData) {
    openModal(previewImageModal);
    previewImage.src = cardData._link;
    previewImage.alt = cardData._name;
    previewImageTitle.textContent = cardData._name;
}

/* EVENT LISTENERS */

profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});

profileModalCloseButton.addEventListener('click', () => closePopup(profileEditModal));
profileEditForm.addEventListener('submit', handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closePopup(addCardModal));

previewImageCloseButton.addEventListener("click", () => closePopup(previewImageModal));


initialCards.forEach((cardData) => {
    const cardElement = renderCard(cardData);
  });





