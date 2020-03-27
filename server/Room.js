module.exports = class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.id = Math.floor(Math.random() * 1000000)
  }

  getName() {
    return this.name;
  }

  changeName(newname) {
    this.name = newname
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(username) {
    if (this.users.length < 1) {
      console.log('the room is empty');
      return;
    } let pos = this.users.indexOf(username);
    if (null == pos) {
      console.log(username + ' doesn\'t exist');
    } this.users.splice(pos, 1);
  }

  getUsers() {
    return this.users;
  }

  getUserCount() {
    return this.users.length;
  }

  toJSON() {
    var res = [];
    this.users.map((u) => {
      res.push(u.toJSON());
    })
    return res;
  }
}