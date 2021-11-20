class Card {
  constructor(
    { card, handleCardClick, handleDeleteBtn, handleLikeButton, userId },
    cardSelector
  ) {
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._likedCard = card.likes;
    this._numberLikes = card.likes.length;
    this._handleDeleteBtn = handleDeleteBtn;
    this._handleLikeButton = handleLikeButton;
    this._ownerId = card.owner._id;
    this._cardId = card._id;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);

    return cardElement;
  }

  _updateLikeCounter(card) {
    this._element.querySelector(".card__like-counter").textContent =
      card.likes.length;
  }

  _toggleLike(e) {
    this._handleLikeButton(!e.target.classList.contains("card__like-button_on"))
      .then((card) => {
        e.target.classList.toggle("card__like-button_on");
        this._updateLikeCounter(card);
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  }

  _setEventListeners() {
    const removeBtn = this._element.querySelector(".card__remove-button");
    if (this._ownerId === this._userId) {
      removeBtn.addEventListener("click", (evt) => {
        this._handleDeleteBtn(evt);
      });
    } else {
      removeBtn.remove();
    }

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardClick());

    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", (e) => {
      this._toggleLike(e);
    });
  }

  _getInitalLikes() {
    const userLikeCard = this._likedCard.some(
      (item) => item._id === this._userId
    );
    if (userLikeCard) {
      this._likeButton.classList.add("card__like-button_on");
    }

    this._element.querySelector(".card__like-counter").textContent =
      this._numberLikes;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");

    this._image.src = this._link;
    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._getInitalLikes(this._image);

    return this._element;
  }
}
export default Card;
