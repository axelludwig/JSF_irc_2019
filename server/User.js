module.exports = class User {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 1000000)
  };

  getName() {
    return this.name.toString();
  }

  getId() {
    return this.id;
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
    };
  }
}