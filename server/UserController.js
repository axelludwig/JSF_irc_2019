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



  saveUsername(name) {
    let res = new User(name)
    this.list.push(res)
    return res
  }


  deleteUser(name) {
    if (this.list.length < 1) {
      console.log('there\'s no users');
      return;
    } let pos = this.list.indexOf(name);
    if (null == pos) {
      console.log(name + ' doesn\'t exist');
    } this.list.splice(pos, 1);
  }

  toJSON() {
    var res = [];
    this.list.map((u) => {
      res.push(u.toJSON());
    })
    return res;
  }
}