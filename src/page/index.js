import "../page/index.css";
import PopupDeleteVerify from "../components/PopupDeleteVerify.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForms from "../components/PopupWithForm.js";
import { selectors } from "../utils/constants.js";
import { settings } from "../utils/constants.js";

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
    selectors.cardTemplateSelector
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
  userName: selectors.profileName,
  userInfo: selectors.profileTitle,
  userImg: selectors.profileImg,
});

const addPlacePopup = new PopupWithForms({
  popupSelector: ".popup_type_add-place",
  handleFormSubmit: (card) => {
    addPlacePopup.renderLoading(true, "Creating...");
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
        addPlacePopup.renderLoading(false, "Create");
      });
  },
});

const editProfileImgPopup = new PopupWithForms({
  popupSelector: ".popup_type_profile-img",
  handleFormSubmit: (avatar) => {
    editProfileImgPopup.renderLoading(true, "Saving...");

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
        editProfileImgPopup.renderLoading(false, "Save");
      });
  },
});

const deleteCard = new PopupDeleteVerify({
  popupSelector: ".popup_type_delete",
  handleFormSubmit: (cardElement, cardId) => {
    deleteCard.renderLoading(true, "Removing...");
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
        deleteCard.renderLoading(false, "Yes");
      });
  },
});

const userInfoPopup = new PopupWithForms({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (profile) => {
    userInfoPopup.renderLoading(true, "Saving...");
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
        userInfoPopup.renderLoading(false, "Save");
      });
  },
});

const popupImage = new PopupWithImage(selectors.containerImagePopupSelector);

function updateEditFormContent(data) {
  selectors.nameInput.value = data.name;
  selectors.titleInput.value = data.info;
}

const addFormValidator = new FormValidator(settings, selectors.addForm);
const editFormValidator = new FormValidator(settings, selectors.editForm);
const editImgFormValidator = new FormValidator(
  settings,
  selectors.editProfileImgForm
);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editImgFormValidator.enableValidation();
//EventListeners

addPlacePopup.setEventListeners();
popupImage.setEventListeners();
userInfoPopup.setEventListeners();
editProfileImgPopup.setEventListeners();
deleteCard.setEventListeners();

selectors.profileAddBtn.addEventListener("click", () => {
  addPlacePopup.open();
  addFormValidator.resetValidation();
  addFormValidator.disableButton();
});

selectors.profileEditBtn.addEventListener("click", () => {
  updateEditFormContent(userInfo.getUserInfo());
  editFormValidator.resetValidation();
  userInfoPopup.open();
});

selectors.profileImgEditBtn.addEventListener("click", () => {
  editProfileImgPopup.open();
  editImgFormValidator.resetValidation();
  editImgFormValidator.disableButton();
});
