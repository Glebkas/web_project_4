/*
 **Query Selectors
 */

//profile selectors
let profileName = document.querySelector(".profile__name");
let profileEditBtn = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");

//popup selctors
let popUp = document.querySelector(".popup");
let closeBtn = document.querySelector(".popup__close-button");

//form selectors
let form = document.querySelector(".form");
let nameInput = document.querySelector("#profile-name");
let titleInput = document.querySelector("#profile-about-me");

//functions

function togglePopup() {
  popUp.classList.toggle("popup_opend");
}

function openPopup() {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  popUp.classList.toggle("popup_opend");
}

function updateName(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  togglePopup();
}

//event listeners
profileEditBtn.addEventListener("click", openPopup, false);
closeBtn.addEventListener("click", togglePopup, false);
form.addEventListener("submit", updateName, false);
