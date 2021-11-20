import Popup from "./Popup.js";

export default class PopupDeleteVerify extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".form");
    this._submitButton = this._popupElement.querySelector(".form__submit");
    this._handleFormSubmit = handleFormSubmit;
  }

  open(evt, cardId) {
    super.open();
    this._cardId = cardId;
    this._card = evt.target.parentElement.parentElement;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._card, this._cardId);
    });

    super.setEventListeners();
  }
}
