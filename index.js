/*
 **Query Selectors
 */

//profile selectors
const profileName = document.querySelector(".profile__name");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");

//popup selctors
const popUp = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close-button");

//form selectors
const form = document.querySelector(".form");
const nameInput = document.querySelector("#profile-name");
const titleInput = document.querySelector("#profile-about-me");

//init
nameInput.value = profileName.textContent;
titleInput.value = profileTitle.textContent;

//functions

function togglePopup() {
  popUp.classList.toggle("popup_opend");
}

function updateName(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  togglePopup();
}

//event listeners
profileEditBtn.addEventListener("click", togglePopup, false);
closeBtn.addEventListener("click", togglePopup, false);
form.addEventListener("submit", updateName, false);
