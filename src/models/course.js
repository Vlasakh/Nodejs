const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());

    return new Promise((res, rej) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err, content) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
        if (err) {
          rej(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Course;
