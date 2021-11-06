export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      info: this._userInfoSelector.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, info }) {
    this._userNameSelector.textContent = name;
    this._userInfoSelector.textContent = info;
  }
}
