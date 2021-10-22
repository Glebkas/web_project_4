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

export { togglePopUp, checkValidEscapePopup, closePopupByEsc };
