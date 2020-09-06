const Course = require('../models/Course');
const { ROUTES } = require('../routes/shareRoutes');

const mapCartItems = (cart) =>
  cart.items.map(({ courseId, count }) => ({
    ...courseId._doc,
    count,
    orderPath: ROUTES.CART.order,
    delPath: ROUTES.CART.delete.replace(':id', courseId.id),
  }));
const calcPrice = (courses) => courses.reduce((res, { price }) => res + price, 0);

const get = async ({ user }) => {
  const { cart } = await user.populate('cart.items.courseId').execPopulate();
  const courses = mapCartItems(cart);

  return { courses, price: calcPrice(courses) };
};

const add = async ({ user, body: { id } }, res) => {
  const course = await Course.findById(id);

  user.addToCart(course);

  res.redirect(ROUTES.CART.one);
};

const deleteItem = async ({ user, params: { id } }, res) => {
  await user.removeCartItem(id);

  res.redirect(ROUTES.CART.one);
};

module.exports = {
  get,
  add,
  deleteItem,
};
