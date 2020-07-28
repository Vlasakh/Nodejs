const Course = require('../models/course');

const post = async ({ body: { title, price, img } = {} }, res) => {
  const course = new Course(title, price, img);

  course.save();

  res.redirect('/courses');
};

module.exports = {
  post,
};
