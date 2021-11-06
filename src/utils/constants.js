// Initial card list
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Form Classes
const formClassList = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  fieldsetSelector: ".form__fieldset",
  errorSelector: ".form__error",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Settings Classes
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// main selectors
const mainSelectors = {
  body: ".root",
  main: ".main",
  cards: ".cards",
  cardsList: ".cards__list",
  popupsList: [...querySelectorAll(".popup")],
};

//profile selectors
const profileSelectors = {
  profile: ".profile",
  profileName: ".profile__name",
  profileEditBtn: ".profile__edit-button",
  profileAddBtn: ".profile__add-button",
  profileTitle: ".profile__title",
};

// profile edit popup selctors
const profileEditPopupSelctors = {
  popupEditProfile: ".popup_type_edit-profile",
  closeBtnEdit: ".popup__close-button_type_edit",
};

// add place popup selctors

const addPlacePopupSelctors = {
  popupAddCard: ".popup_type_add-plcae",
  closeBtnAdd: ".popup__close-button_type_add",
};

//Image popup selectors
const imagePopupSelectors = {
  clostBtnImage: ".popup__close-button_type_display-image",
  popupImage: ".popup_type_display-image",
};

//edit form selectors
const editFormSelectors = {
  editForm: ".form",
  nameInput: "#profile-name",
  titleInput: "#profile-about-me",
};

//add form selectors
const addFormSelectors = {
  addForm: ".form",
  imageTitleInput: "#image-title",
  imageUrlInput: "#image-url",
  addCardButton: ".form__submit",
};
