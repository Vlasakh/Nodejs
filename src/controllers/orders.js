
const { ROUTES } = require('../routes/shareRoutes');
const Orders = require('../models/Orders');

class OrdersController {
  getAll = async ({ user }) => {
    const orders = (await Orders.find({ 'user.userId': user._id })).map(({ date, courses }) => ({
      date,
      courses: courses.map(({ count, course: { title } }) => ({ count, title })),
      price: courses.reduce((res, { course }) => res + course.price, 0),
    }));

    return {
      orders,
      // pathCartAdd: ROUTES.CART.add,
    };
  };

  add = async ({ user, body: { title, price, img } = {} }, res) => {
    try {
      const { cart } = await user.populate('cart.items.courseId').execPopulate();

      const courses = cart.items.map(({ count, courseId }) => ({
        count,
        course: { ...courseId._doc },
      }));
      const order = new Orders({
        user: {
          name: user.name,
          userId: user,
        },
        courses,
      });

      await order.save();
      await user.clearCart();

      res.redirect(ROUTES.ORDERS);
    } catch (e) {
      console.error('Error', e);
    }
  };
}

module.exports = new OrdersController();
