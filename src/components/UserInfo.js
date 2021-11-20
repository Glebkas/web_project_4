export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userImgSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userImgSelector = userImgSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      info: this._userInfoSelector.textContent,
      
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userInfoSelector.textContent = data.about;
    this._userImgSelector.src = data.avatar;
    this._userId = data._id;
  }

  getId() {
    return this._userId;
  }

  setAvatarImg(data) {
    this._userImgSelector.src = data.avatar;
  }
}
