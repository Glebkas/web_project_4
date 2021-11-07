import "../page/index.css";
import profileImgSrc from "../images/profile-image.jpg";

import initialCards from "../utils/initial-cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForms from "../components/PopupWithForm.js";

const profileImg = document.getElementById("profileImg");

profileImg.src = profileImgSrc;

//profile selectors
const profileName = document.querySelector(".profile__name");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");

//edit form selectors
const editForm = document.querySelector(".form");
const nameInput = document.querySelector("#profile-name");
const titleInput = document.querySelector("#profile-about-me");

//add form selectors
const addForm = document.querySelector(".form_type_add-place");

const containerImagePopupSelector = ".popup_type_display-image";
const cardTemplateSelector = "#card-template";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

//functions
const popupImage = new PopupWithImage(containerImagePopupSelector);

const createCard = (card) => {
  const newCard = new Card(
    {
      card,
      handleCardClick: () => {
        popupImage.open(card);
    },
    cardTemplateSelector
  );
  cardList.addItem(newCard.generateCard());
};

const cardList = new Section(
  {
    renderer: createCard,
  },
  ".cards__list"
);

const addPlacePopup = new PopupWithForms({
  popupSelector: ".popup_type_add-place",
  handleFormSubmit: createCard,
});

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userInfoSelector: profileTitle,
});

function onSubmitEditForm(inputs) {
  userInfo.setUserInfo(inputs);
  userInfoPopup.close();
  updateEditFormContent(userInfo.getUserInfo());
}

function updateEditFormContent(data) {
  nameInput.value = data.name;
  titleInput.value = data.info;
}

const userInfoPopup = new PopupWithForms({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: onSubmitEditForm,
});

const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

//EventListeners

addPlacePopup.setEventListeners();
popupImage.setEventListeners();
userInfoPopup.setEventListeners();

profileAddBtn.addEventListener("click", () => {
  addPlacePopup.open();
  addFormValidator.submitButtonDisable();
});

profileEditBtn.addEventListener("click", () => {
  updateEditFormContent(userInfo.getUserInfo());
  userInfoPopup.open();
});

cardList.renderItems(initialCards);
