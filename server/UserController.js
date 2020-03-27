var User = require("./User.js");

module.exports = class UserController {
  constructor() {
    this.list = [];
  }

  getUser(name) {
    for (let i = 0; i < this.list.length; ++i) {
      if (name == this.list[i].name) return this.list[i]
    }
  }

  createUser(name) {
    let res = new User(name)
    this.list.push(res)
    return res
  }


  deleteUser() {

  }

  toJSON() {
    var res = [];
    this.list.map((u) => {
      res.push(u.toJSON());
    })
    return res;
  }
}