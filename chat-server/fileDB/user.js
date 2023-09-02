const fs = require('fs');
const path = require("path");

class User {
  static dbPath = path.join(__dirname, "data", "users.json");
  static async findOne(query) {
    const users = await readJsonAsync(User.dbPath);

    const isMatch = (user) => {
      return Object.keys(query).every(key => user[key] === query[key]);
    }

    const user = users.find(isMatch)
    return user;
  }

  static async create(user) {
    const users = await readJsonAsync(User.dbPath);
    users.push(user);
    await writeJsonAsync(User.dbPath, users);
  }
}

const readJsonAsync = (path) => {
  return new Promise((resolve, reject) => fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      reject(err);
    }
    else {
      resolve(JSON.parse(data))
    }
  }));
}

const writeJsonAsync = (path, data) => {
  return new Promise((resolve, reject) => fs.writeFile(path, JSON.stringify(data, null, 2), { encoding: "utf8", flag: "w" }, (err) => {
    if (err) {
      reject(err);
    }
    else {
      resolve();
    }
  }));
}

module.exports = { User };