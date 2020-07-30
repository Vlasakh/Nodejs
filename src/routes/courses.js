const { PATH_CART_ADD } = require('../routes/shareRoutes');
const Course = require('../models/Course');

const get = async (req, res) => {
  const courses = await Course.getAll();

  return {
    courses,
    pathCartAdd: PATH_CART_ADD,
  };
};

module.exports = {
  get,
};
