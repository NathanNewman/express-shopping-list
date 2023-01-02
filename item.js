const items = require("./fakeDb.js");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }
  static getAll() {
    return items;
  }
  static getItem(name) {
    
    const item = items.find(i => i.name === name);
    if (item === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    return item;
  }
  static patch(name, data) {
    const item = Item.getItem(name);
    if (item === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    item.name = data.name;
    item.price = data.price;
    return { "name" : data.name, "price" : data.price };
  }
  static delete(name) {
    let itemId = items.findIndex((i) => i.name === name);
    console.log(itemId);
    if (itemId === -1) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(itemId, 1);
  }
}

module.exports = Item;
