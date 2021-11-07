class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._submitButton = settings.submitButton;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formEl = formElement;
  }

  _showInputError(inputEl) {
    const errorSpan = this._formEl.querySelector("#" + inputEl.id + "-error");
    errorSpan.textContent = inputEl.validationMessage;
    errorSpan.classList.add(this._errorClass);
    inputEl.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputEl) {
    const errorSpan = this._formEl.querySelector("#" + inputEl.id + "-error");
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
    inputEl.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButton(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    const submitButton = this._formEl.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(inputList, submitButton);
      });
    });
  }

  submitButtonDisable() {
    this._formEl._submitButton.disabled = true;
    this._formEl._submitButton.classList.add("form__submit_disabled");
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
