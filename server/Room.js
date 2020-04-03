module.exports = class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
    this.id = Math.floor(Math.random() * 1000000)
  }

  // la structure d'un message
  // message: this.message,
  // username: this.username,
  // room: this.room

  addMessage(message){
    this.messages.push(message)
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getUsers() {
    return this.users;
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
    return {
      name: this.getName(),
      id: this.getId(),
      users: this.getUsers()
    }
  }
}