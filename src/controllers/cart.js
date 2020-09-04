const Course = require('../models/Course');
const Cart = require('../models/Cart');
const { ROUTES } = require('../routes/shareRoutes');

const get = async ({ user, body: { id } }, res) => {
  const cart = await Cart.fetch();

  return { cart };
};

const add = async ({ user, body: { id } }, res) => {
  const course = await Course.findById(id);

  user.addToCart(course);

  res.redirect(ROUTES.CART.one);
};

module.exports = {
  get,
  add,
};
