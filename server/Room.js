module.exports = class Room {
    constructor(name) {
      this.name = name;
      this.users = [];
      this.id = Math.floor(Math.random() * 1000000)}
    
    getName() {
      return this.name;
    }
    
    changeName(newname) {
      this.name = newname
    }

    addUser(username, id) {
        this.users.push({
            username: username,
            id: id
        });
    }

    removeUser(username) {
        this.users.map((user) => {
            console.log(user.username)
        })
    }

    getUserCount() {
        return this.users.length;
    }

    toString() {
        return {
            name: this.name,
            id: this.id,
            users: this.users
        };
    }
  }