//init cards

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

// main selectors
const body = document.querySelector(".root");
const main = body.querySelector(".main");
const cards = main.querySelector(".cards");
const cardsList = cards.querySelector(".cards__list");

//profile selectors
const profile = main.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");

//card selectors
//const cardsLstItm = cards.querySelector(".cards__list-item");
// card = cardsLstItm.querySelector(".card");
//const cardImg = card.querySelector(".card__image");
///const cardTtl = card.querySelector(".card__image");
//const cardLike = card.querySelector(".card__like-button");
//const cardRmvBtn = card.querySelector(".card__remove-button");

// profile edit popup selctors

const editPopUp = main.querySelector(".popup_type_edit-profile");
const closeBtnEdit = main.querySelector(".popup__close-button_type_edit");

// add place popup selctors
const addPopUp = main.querySelector(".popup_type_add-plcae");
const closeBtnAdd = main.querySelector(".popup__close-button_type_add");

//edit form selectors
const editForm = editPopUp.querySelector(".form");
const nameInput = editPopUp.querySelector("#profile-name");
const titleInput = editPopUp.querySelector("#profile-about-me");

//add form selectors
const addForm = addPopUp.querySelector(".form");
const imageTitleInput = addPopUp.querySelector("#image-title");
const imageUrlInput = addPopUp.querySelector("#image-url");

//template selectors

//functions

function openEditPopup() {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  togglePopUp(editPopUp);
}

function openAddPopup() {
  imageTitleInput.value = null;
  imageUrlInput.value = null;
  togglePopUp(addPopUp);
}

function updateName(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  togglePopUp(editPopUp);
}

function toggleAddPopup() {
  addPopUp.classList.toggle("popup_opend");
}

const togglePopUp = (popupFrame) => popupFrame.classList.toggle("popup_opend");

function removeCard(element) {
  element.remove();
}

function addCard(card) {
  const cardTemplate = body
    .querySelector("#card-template")
    .content.querySelector(".cards__list-item");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardRmvBtn = cardElement.querySelector(".card__remove-button");
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardRmvBtn.addEventListener("click", () => removeCard(cardElement));
  cardImage.addEventListener("click", () => {});
  cardLike.addEventListener("click", () => {});
  return cardElement;
}

const renderCard = (card, container) => {
  container.append(addCard(card));
};

initialCards.forEach((card) => renderCard(card, cardsList));

//event listeners
profileEditBtn.addEventListener("click", () => openEditPopup());
closeBtnEdit.addEventListener("click", () => togglePopUp(editPopUp));
profileAddBtn.addEventListener("click", () => openAddPopup());
closeBtnAdd.addEventListener("click", () => togglePopUp(addPopUp));
editForm.addEventListener("submit", updateName, false);
addForm.addEventListener("submit", prenderCard, false);
