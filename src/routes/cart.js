const Course = require('../models/Course');
const Cart = require('../models/Cart');
const { ROUTES } = require('../routes/index');

const cart = async ({ body: { id } }, res) => {
  const cart = await Cart.fetch();

  return { cart };
};

const cartAdd = async ({ body: { id } }, res) => {
  const course = await Course.getById();

  await Cart.add(course);

  res.redirect(ROUTES.CART.one);
};

module.exports = {
  cart,
  cartAdd,
};
