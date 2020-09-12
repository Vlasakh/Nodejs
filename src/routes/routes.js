const courses = require('../controllers/courses');
const cart = require('../controllers/cart');
const orders = require('../controllers/orders');

const { ROUTES } = require('./shareRoutes');

const ROUTES_TYPES = {
  externalLink: 'externalLink',
};

const routesConfig = [
  { path: ROUTES.HOME, name: 'Main', title: 'Main page', template: 'index' },

  { path: ROUTES.COURSE.one, name: 'Course', title: 'Course', template: 'course', controller: courses.getCourse },
  { path: ROUTES.COURSE.all, name: 'Courses', title: 'Courses', template: 'courses', controller: courses.getAll },
  { path: ROUTES.COURSE.add, name: 'Add', title: 'Add course', template: 'course-add' },
  { path: ROUTES.COURSE.add, method: 'post', controller: courses.addNew },
  {
    path: ROUTES.COURSE.edit,
    controller: courses.editForm,
    name: 'Edit',
    title: 'Edit course',
    template: 'course-edit',
  },
  { path: ROUTES.COURSE.edit, method: 'post', controller: courses.edit },
  { path: ROUTES.COURSE.delete, method: 'post', controller: courses.del },

  { path: ROUTES.ABOUT, name: 'About', title: 'About us', template: 'about' },

  { path: ROUTES.CART.one, controller: cart.get, name: 'Cart', title: 'Cart', template: 'cart' },
  { path: ROUTES.CART.add, controller: cart.add, method: 'post' },
  { path: ROUTES.CART.delete, controller: cart.deleteItem, method: 'post' },

  { path: ROUTES.MONGO, title: 'Open Mongo cluster', name: 'Mongo', type: ROUTES_TYPES.externalLink },

  { path: ROUTES.ORDERS, title: '', name: 'Orders', controller: orders.getAll, template: 'orders' },
  { path: ROUTES.ORDERS, method: 'post', controller: orders.add },
];

module.exports = { default: routesConfig, ROUTES_TYPES };
