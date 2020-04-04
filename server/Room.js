var fs = require('fs');
const path = require('path');

// la structure d'un message
// message: this.message,
// username: this.username,
// room: this.room

module.exports = class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
    this.id = Math.floor(Math.random() * 1000000);

    this.delimiter = ':;:';

    // this.path = '../logs/' + this.name + '.txt';
    // this.path = 'logs\\' + this.name + '.txt';
    let t = this.name + '.txt';
    this.fileName = path.join('logs', t);   

    try {
      if (fs.existsSync(this.fileName)) {
        console.log('file ' + this.fileName + ' already exists')

      } else {
        fs.openSync(this.fileName, 'w')
        console.log('file ' + this.fileName + ' created');
      }
    } catch (err) {
      console.error(err)
    }

    // var text = 'test:;:test2:;:test3';
    // console.log(text.split(':;:'))


  }

  getFormattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    if (minu < 10) { minu = '0' + minu }

    return dd + '/' + mm + '/' + yyyy + ' - ' + hour + ':' + minu;
  }

  loadMessagesFromFile() {

  }

  storeMessage(object) {
    var time = this.getFormattedDate();
    var hour = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    
    var line = object.username + this.delimiter + object.message + this.delimiter + time + '\n';
    fs.appendFile(this.fileName, line, function (err) {
      if (err) throw err;
    });

  }

  addMessage(message) {
    this.messages.push(message)
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

  getUserCount() {
    return this.users.length;
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      users: this.users
    }
  }
}