class Permission {
  constructor(uid) {
    this._isReadPost = uid === "1" || uid === "2";
    this._isWritePost = uid === "2";
  }

  get isReadPost() {
    return this._isReadPost;
  }

  get isWritePost() {
    return this._isWritePost;
  }
}

module.exports = Permission;