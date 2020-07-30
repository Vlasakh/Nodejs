const { PATH_COURSES } = require('../routes/index');
const Course = require('../models/Course');

const post = async ({ body: { title, price, img } = {} }, res) => {
  const course = new Course(title, price, img);

  course.save();

  res.redirect(PATH_COURSES);
};

module.exports = {
  post,
};
