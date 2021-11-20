export default class UserInfo {
  constructor({userName, userInfo, userImg }) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._userImg = userImg;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
      
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this.setAvatarImg(data)
    this._userId = data._id;
  }

  getId() {
    return this._userId;
  }

  setAvatarImg(data) {
    this._userImg.src = data.avatar;
  }
}
