// main selectors
const body = document.querySelector(".root");
const main = body.querySelector(".main");
const cards = main.querySelector(".cards");
const cardsList = cards.querySelector(".cards__list");
const popUp = main.querySelector(".popup");
const popUpOpend = main.querySelector(".popup_opend");
const PopUpList = [...main.querySelectorAll(".popup")];

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

//card selectors
const cardTemplate = body
  .querySelector("#card-template")
  .content.querySelector(".cards__list-item");

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

const togglePopUp = (popupFrame) => popupFrame.classList.toggle("popup_opend");

function removeCard(element) {
  element.remove();
}

function toggleLike(element) {
  element.classList.toggle("card__like-button_on");
}

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardRmvBtn = cardElement.querySelector(".card__remove-button");
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardRmvBtn.addEventListener("click", () => removeCard(cardElement));
  cardImage.addEventListener("click", () => openImagePreview(card));
  cardLike.addEventListener("click", () => toggleLike(cardLike));
  return cardElement;
}

const openImagePreview = (card) => {
  popupImgTitle.textContent = card.name;
  popupImg.src = card.link;
  popupImg.alt = card.name;
  togglePopUp(popupImage);
};

const renderCard = (card, container) => {
  container.append(addCard(card));
};

const prependCard = (element, container) => {
  container.prepend(element);
};

initialCards.forEach((card) => renderCard(card, cardsList));

function addCardFormSubmitHandler(event) {
  event.preventDefault();
  prependCard(
    addCard({ name: imageTitleInput.value, link: imageUrlInput.value }),
    cardsList
  );
  togglePopUp(popupAddCard);
}

function escape(e) {
  if (e.key === "Escape") {
    closePopUp();
  }
}

function overlayClick(e) {
  if (
    e.target == e.currentTarget &&
    !e.currentTarget.classList.contains("popup__container")
  ) {
    closePopUp();
  }
}

function closePopUp() {
  PopUpList.forEach((popUpEl) => {
    popUpEl.classList.remove("popup_opend");
  });
}

PopUpList.forEach((popUpEl) => {
  popUpEl.addEventListener("click", overlayClick, false);
});

//event listeners
profileEditBtn.addEventListener("click", () => openEditPopup());
closeBtnEdit.addEventListener("click", () => togglePopUp(popupEditProfile));
profileAddBtn.addEventListener("click", () => openAddPopup());
closeBtnAdd.addEventListener("click", () => togglePopUp(popupAddCard));
editForm.addEventListener("submit", editProfileFormSubmitHandler, false);
addForm.addEventListener("submit", addCardFormSubmitHandler, false);
clostBtnImage.addEventListener("click", () => togglePopUp(popupImage));
document.addEventListener("keydown", escape, false);
