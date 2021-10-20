import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// main selectors
const body = document.querySelector(".root");
const main = body.querySelector(".main");
const cards = main.querySelector(".cards");
const cardsList = cards.querySelector(".cards__list");
const popUp = main.querySelector(".popup");
const popUpOpend = main.querySelector(".popup_opend");
const popupsList = [...main.querySelectorAll(".popup")];
const formError = main.querySelector(".form__error");

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
const popupImg = popupImage.querySelector(".popup__image");
const popupImgTitle = popupImage.querySelector(
  ".popup__title_type_display-image"
);

//edit form selectors
const editForm = popupEditProfile.querySelector(".form");
const nameInput = popupEditProfile.querySelector("#profile-name");
const titleInput = popupEditProfile.querySelector("#profile-about-me");

//add form selectors
const addForm = popupAddCard.querySelector(".form");
const imageTitleInput = popupAddCard.querySelector("#image-title");
const imageUrlInput = popupAddCard.querySelector("#image-url");
const addCardButton = popupAddCard.querySelector(".form__submit");

//card selectors
const cardTemplate = body
  .querySelector("#card-template")
  .content.querySelector(".cards__list-item");

const cardSelector = body.querySelector("#card-template");
//functions

function openEditPopup() {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  togglePopUp(popupEditProfile);
  //resetForm(popupEditProfile);
}

function openAddPopup() {
  imageTitleInput.value = null;
  imageUrlInput.value = null;
  togglePopUp(popupAddCard);
  //resetForm(popupAddCard);
}

function editProfileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  togglePopUp(popupEditProfile);
}

const togglePopUp = (popupFrame) => {
  popupFrame.classList.toggle("popup_opend");
  checkValidEscapePopup(popupFrame);
};

/*const checkValidEscapePopup = (popupFrame) => {
  if (popupFrame.classList.contains("popup_opend")) {
    document.addEventListener("keydown", closePopupByEsc, false);
  } else {
    document.removeEventListener("keydown", closePopupByEsc, false);
  }
};
*/
/*
function removeCard(element) {
  element.remove();
}

function toggleLike(element) {
  element.classList.toggle("card__like-button_on");
}

/*function addCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardRmvBtn = cardElement.querySelector(".card__remove-button");
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardRmvBtn.addEventListener("click", () => removeCard(cardElement));
  cardImage.addEventListener("click", () => openImagePreview(data));
  cardLike.addEventListener("click", () => toggleLike(cardLike));
  return cardElement;
}
*/
/*const openImagePreview = (card) => {
  popupImgTitle.textContent = card.name;
  popupImg.src = card.link;
  popupImg.alt = card.name;
  togglePopUp(popupImage);
};
*/

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

/*function closePopupByEsc(e) {
  if (e.key === "Escape") {
    togglePopUp(document.querySelector(".popup_opend"));
  }
}
*/

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
