import { togglePopUp } from "./utils.js";
import initialCards from "./initial-cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// main selectors
const body = document.querySelector(".root");
const main = body.querySelector(".main");
const cards = main.querySelector(".cards");
const cardsList = cards.querySelector(".cards__list");
const popupsList = [...main.querySelectorAll(".popup")];

//profile selectors
const profile = main.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");

// profile edit popup selctors

const popupEditProfile = main.querySelector(".popup_type_edit-profile");
const closeBtnEdit = main.querySelector(".popup__close-button_type_edit");

// add place popup selctors
const popupAddCard = main.querySelector(".popup_type_add-plcae");
const closeBtnAdd = main.querySelector(".popup__close-button_type_add");

//Image popup selectors
const clostBtnImage = main.querySelector(
  ".popup__close-button_type_display-image"
);
const popupImage = main.querySelector(".popup_type_display-image");

//edit form selectors
const editForm = popupEditProfile.querySelector(".form");
const nameInput = popupEditProfile.querySelector("#profile-name");
const titleInput = popupEditProfile.querySelector("#profile-about-me");

//add form selectors
const addForm = popupAddCard.querySelector(".form");
const imageTitleInput = popupAddCard.querySelector("#image-title");
const imageUrlInput = popupAddCard.querySelector("#image-url");
const addCardButton = popupAddCard.querySelector(".form__submit");

//functions

function openEditPopup() {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  togglePopUp(popupEditProfile);
}

function openAddPopup() {
  imageTitleInput.value = null;
  imageUrlInput.value = null;
  togglePopUp(popupAddCard);
}

function editProfileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  togglePopUp(popupEditProfile);
}

const renderCard = (data, container) => {
  const card = new Card(data, "#card-template").generateCard();
  container.append(card);
};

const prependCard = (element, container) => {
  const card = new Card(element, "#card-template").generateCard();
  container.prepend(card);
};

initialCards.forEach((data) => renderCard(data, cardsList));

function addCardFormSubmitHandler(event) {
  event.preventDefault();
  prependCard(
    { name: imageTitleInput.value, link: imageUrlInput.value },
    cardsList
  );
  addCardButton.disabled = true;
  addCardButton.classList.add("form__submit_disabled");
  togglePopUp(popupAddCard);
}

function closePopupByOverlayClick(e) {
  if (
    e.target == e.currentTarget &&
    !e.currentTarget.classList.contains("popup__container")
  ) {
    togglePopUp(document.querySelector(".popup_opend"));
  }
}

popupsList.forEach((popUpEl) => {
  popUpEl.addEventListener("click", closePopupByOverlayClick, false);
});

//event listeners
profileEditBtn.addEventListener("click", () => openEditPopup());
closeBtnEdit.addEventListener("click", () => togglePopUp(popupEditProfile));
profileAddBtn.addEventListener("click", () => openAddPopup());
closeBtnAdd.addEventListener("click", () => togglePopUp(popupAddCard));
editForm.addEventListener("submit", editProfileFormSubmitHandler, false);
addForm.addEventListener("submit", addCardFormSubmitHandler, false);
clostBtnImage.addEventListener("click", () => togglePopUp(popupImage));

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
