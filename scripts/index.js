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

/* FUNCTIONS */

function closePopup(modal) {
    modal.classList.remove("modal_opened");
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}
  
function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.cards__image');
    const cardTitleEl = cardElement.querySelector('.cards__title');
    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    return cardElement;
}

/* EVENT HANDLERS */

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const cardTitleInput = addCardFormElement.querySelector(".modal__input-type-title");
    const cardUrlInput = addCardFormElement.querySelector(".modal__input-type-url");
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard(name, link), cardListEl;
    closePopup(addCardModal);
}

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

/* EVENT LISTENERS */

profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
});
profileEditButton.addEventListener("click", () => openModal(profileEditModal));
profileModalCloseButton.addEventListener('click', () => closePopup(profileEditModal));
profileEditForm.addEventListener('submit', handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closePopup(addCardModal));

initialCards.forEach(cardData) => {
    renderCard(cardData, cardListEl);
}
