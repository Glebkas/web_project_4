import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".form");
    this._submitButton = this._popupElement.querySelector(".form__submit");
    this._inputs = Array.from(this._popupForm.querySelectorAll(".form__input"));

    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formValues = this._getInputValues();
      this._handleFormSubmit(this._formValues);
    });
  }

  close() {
    this._popupForm.reset();

    super.close();
  }

  renderLoading(loading, message) {
    if (loading) {
      this._submitButton.textContent = message;
    } else {
      this._submitButton.textContent = message;
    }
  }
}
