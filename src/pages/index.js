import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
  },
];

/* ELEMENTS */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardFormElement = document.querySelector("#add-card-form");

const formValidationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  formValidationConfig,
  addCardFormElement
);
addCardFormValidator.enableValidation();

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  formValidationConfig
);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

const editProfileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  formValidationConfig
);

const previewModal = new ModalWithImage("#preview__image-modal");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

/* FUNCTIONS */

function handleProfileEditSubmit(values) {
  userInfo.setUserInfo(values);
  editProfileModal.close();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

function handleAddCardFormSubmit(values) {
  addCardModal.close();
  cardSection.addItem({ name: values.title, link: values.url });
  addCardFormValidator.disableButton();
}

function handleImageClick(cardData) {
  previewModal.open(cardData);
}

/* EVENT LISTENERS */

profileEditButton.addEventListener("click", () => {
  editProfileModal.open();
  const profileInfo = userInfo.getUserInfo();
  editProfileModal.setInputValues(profileInfo);
  profileEditFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});
previewModal.setEventListeners();
addCardModal.setEventListeners();
editProfileModal.setEventListeners();
cardSection.rendererItems();
