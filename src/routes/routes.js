const courses = require('./courses');
const { cart, cartAdd } = require('./cart');

const {
  PATH_HOME,
  PATH_COURSES,
  PATH_ADD_COURSE,
  PATH_ABOUT,
  PATH_CART,
  PATH_CART_ADD,
  PATH_EDIT_COURSE,
} = require('./shareRoutes');

const routesConfig = [
  { path: PATH_HOME, name: 'Main', title: 'Main page', template: 'index' },

  { path: PATH_COURSES, name: 'Courses', title: 'Courses', template: 'courses', controller: courses.get },
  { path: PATH_ADD_COURSE, name: 'Add', title: 'Add course', template: 'course-add' },
  { path: PATH_ADD_COURSE, method: 'post', controller: courses.addNew },
  { path: PATH_EDIT_COURSE, controller: courses.editForm, name: 'Edit', title: 'Edit course', template: 'course-edit' },
  { path: PATH_EDIT_COURSE, method: 'post', controller: courses.editForm },

  { path: PATH_ABOUT, name: 'About', title: 'About us', template: 'about' },

  { path: PATH_CART, controller: cart, name: 'Cart', title: 'Cart', template: 'cart' },
  { path: PATH_CART_ADD, controller: () => {}, method: 'post' },
];

module.exports = routesConfig;
