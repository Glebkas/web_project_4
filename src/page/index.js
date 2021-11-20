import "../page/index.css";
import PopupDeleteVerify from "../components/PopupDeleteVerify.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForms from "../components/PopupWithForm.js";

//profile selectors
const profileName = document.querySelector(".profile__name");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileImgEditBtn = document.querySelector(".profile__img-edit-button");
const editProfileImgForm = document.querySelector(".form_type_edit-img");
//edit form selectors
const editForm = document.querySelector(".form_type_edit-profile");
const nameInput = document.querySelector("#profile-name");
const titleInput = document.querySelector("#profile-about-me");

//delete popup selectors
const containerDeletePopupSelector =
  document.querySelector(".popup_type_delete");
const deleteForm = document.querySelector(".form_type_delete");
const deleteButton = document.querySelector(".form__submit_type_delete");

//add form selectors
const addForm = document.querySelector(".form_type_add-place");
const containerImagePopupSelector = ".popup_type_display-image";
const cardTemplateSelector = "#card-template";
const profileImg = document.querySelector(".profile__img");

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "34a96d6c-47dd-42d3-b220-f7d1e2e3c502",
    "Content-Type": "application/json",
  },
});

const initialProfile = api.getInitialProfile();
const initialCards = api.getInitialCards();

Promise.all([initialProfile, initialCards])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(`Error:${err}`);
  });

const createCard = (card) => {
  const newCard = new Card(
    {
      card,
      handleCardClick: () => {
        popupImage.open(card);
      },
      handleDeleteBtn: (evt) => {
        deleteCard.open(evt, card._id);
      },
      handleLikeButton: (buttonLiked) => {
        return buttonLiked ? api.likeCard(card._id) : api.removeLike(card._id);
      },
      userId: userInfo.getId(),
    },
    cardTemplateSelector
  );

  return newCard;
};

const cardList = new Section(
  {
    renderer: (card) => {
      const newCard = createCard(card);
      const cardElement = newCard.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userInfoSelector: profileTitle,
  userImgSelector: profileImg,
});

function loadHandle(loading, popupSelector, message) {
  const currentPopup = document.querySelector(popupSelector);
  if (loading) {
    currentPopup.querySelector(settings.submitButtonSelector).textContent =
      message;
  } else {
    currentPopup.querySelector(settings.submitButtonSelector).textContent =
      message;
  }
}

const addPlacePopup = new PopupWithForms({
  popupSelector: ".popup_type_add-place",
  handleFormSubmit: (card) => {
    loadHandle(true, ".popup_type_add-place", "Creating...");
    api
      .postCard(card)
      .then((cardData) => {
        const newCard = createCard(cardData);
        cardList.addItem(newCard.generateCard());
        addPlacePopup.close();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        loadHandle(false, ".popup_type_add-place", "Create");
      });
  },
});

const editProfileImgPopup = new PopupWithForms({
  popupSelector: ".popup_type_profile-img",
  handleFormSubmit: (avatar) => {
    loadHandle(true, ".popup_type_profile-img", "Saving...");

    api
      .changeProfileImg(avatar)
      .then((profileData) => {
        userInfo.setAvatarImg(profileData);
        editProfileImgPopup.close();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        loadHandle(false, ".popup_type_profile-img", "Change");
      });
  },
});

const deleteCard = new PopupDeleteVerify({
  popupSelector: ".popup_type_delete",
  handleFormSubmit: (cardElement, cardId) => {
    loadHandle(true, ".popup_type_delete", "Removing...");
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        deleteCard.close();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        loadHandle(false, ".popup_type_delete", "Yes");
      });
  },
});

const userInfoPopup = new PopupWithForms({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (profile) => {
    loadHandle(true, ".popup_type_edit-profile", "Saving...");
    api
      .patchProfileInfo(profile)
      .then((profileData) => {
        userInfo.setUserInfo(profileData);
        userInfoPopup.close();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        loadHandle(false, ".popup_type_edit-profile", "Update");
      });
  },
});

const popupImage = new PopupWithImage(containerImagePopupSelector);

function updateEditFormContent(data) {
  nameInput.value = data.name;
  titleInput.value = data.info;
}

const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);
const editImgFormValidator = new FormValidator(settings, editProfileImgForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editImgFormValidator.enableValidation();
//EventListeners

addPlacePopup.setEventListeners();
popupImage.setEventListeners();
userInfoPopup.setEventListeners();
editProfileImgPopup.setEventListeners();
deleteCard.setEventListeners();

profileAddBtn.addEventListener("click", () => {
  addPlacePopup.open();
  addFormValidator.submitButtonDisable();
});

profileEditBtn.addEventListener("click", () => {
  updateEditFormContent(userInfo.getUserInfo());
  userInfoPopup.open();
});

profileImgEditBtn.addEventListener("click", () => {
  editProfileImgPopup.open();
  addFormValidator.submitButtonDisable();
});
