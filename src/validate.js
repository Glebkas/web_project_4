const hasValidInputs = (inputList) =>
  inputList.every((input) => input.validity.valid === true);

const showInputError = (inputEl, formEl, { inputErrorClass, ErrorClass}) => {
  const errorSpan = formEl.querySelector("#" + inputEl.id + "-error");
  errorSpan.textContent = inputEl.validationMessage;
  errorSpan.classList.add(ErrorClass);
  inputEl.classList.add(inputErrorClass);
};

const hideInputError = (inputEl, formEl, { inputErrorClass, ErrorClass }) => {
  const errorSpan = formEl.querySelector("#" + inputEl.id + "-error");
  errorSpan.textContent = "";
  errorSpan.classList.remove(ErrorClass);
  inputEl.classList.remove(inputErrorClass);
};
const checkInputValidity = (formEl, inputEl, settings) => {
  if (inputEl.validity.valid) {
    hideInputError(inputEl, formEl, settings);
  } else {
    showInputError(inputEl, formEl, settings);
  }
};

const toggleButton = (inputList, button, settings) => {
  if (hasValidInputs(inputList)) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
    button.classList.add(settings.submitButton);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
    button.classList.remove(settings.submitButton);
  }
};

const setEventListeners = (formEl, settings) => {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, settings);
      toggleButton(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  ErrorClass: "form__error_visible",
});
