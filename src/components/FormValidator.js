class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._submitButton = settings.submitButton;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formEl = formElement;
    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._button = this._formEl.querySelector(this._submitButtonSelector);
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
    const hasValidInputs = inputList.every((input) => input.validity.valid);

    if (hasValidInputs) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      this.disableButton();
    }
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButton(this._inputList, this._button);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(this._inputList, this._button);
      });
    });
  }

  disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
