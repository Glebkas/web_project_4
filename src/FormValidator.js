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

  _setEventListeners() {
    const inputList = [...this._formEl.querySelectorAll(this._inputSelector)];

    this._toggleButton(inputList);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(inputList);
      });
    });
  }

  _toggleButton(inputList) {
    const button = this._formEl.querySelector(this._submitButtonSelector);

    const hasValidInputs = inputList.every((input) => input.validity.valid);

    if (hasValidInputs) {
      button.disabled = false;
      button.classList.add(this._submitButton);
      button.remove(this._inactiveButtonClass);
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.classList.remove(this._submitButton);
      button.disabled = true;
    }
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
