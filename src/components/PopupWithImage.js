import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popupElement.querySelector(".popup__image");
    this._imgTitle = this._popupElement.querySelector(
      ".popup__title_type_display-image"
    );
  }

  open({ link, name }) {
    this._imgTitle.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}

export default PopupWithImage;
