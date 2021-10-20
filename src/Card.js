const popupImage = document.querySelector(".popup_type_display-image");
const popupImg = document.querySelector(".popup__image");
const popupImgTitle = document.querySelector(
  ".popup__title_type_display-image"
);

const togglePopUp = (popupFrame) => {
  popupFrame.classList.toggle("popup_opend");
  checkValidEscapePopup(popupFrame);
};

const checkValidEscapePopup = (popupFrame) => {
  if (popupFrame.classList.contains("popup_opend")) {
    document.addEventListener("keydown", closePopupByEsc, false);
  } else {
    document.removeEventListener("keydown", closePopupByEsc, false);
  }
};

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    togglePopUp(document.querySelector(".popup_opend"));
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._element.classList.toggle("card__like-button_on");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _openImagePreview() {
    popupImgTitle.textContent = this._name;
    popupImg.src = this._link;
    popupImg.alt = this._name;

    togglePopUp(popupImage);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openImagePreview();
      });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._toggleLike();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
export default Card;
