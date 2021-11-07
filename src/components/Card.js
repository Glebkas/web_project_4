class Card {
  constructor({ card, handleCardClick }, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;

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
    const cardLike = this._element.querySelector(".card__like-button");
    cardLike.classList.toggle("card__like-button_on");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
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
        this._handleCardClick();
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
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");

    this._image.src = this._link;
    this._title.textContent = this._name;
    this._image.alt = this._name;

    return this._element;
  }
}
export default Card;
