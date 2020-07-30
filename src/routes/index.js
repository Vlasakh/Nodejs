const { Router } = require('express');
const { isArray } = require('lodash');

const { get: courses } = require('./courses');
const { post: addCoursePost } = require('./add-course');
const { cart, cartAdd } = require('./cart');

const { PATH_CART, PATH_CART_ADD, PATH_COURSES } = require('./shareRoutes');

const ROUTES = {
  home: 'home',
  courses: 'courses',
  addCourse: 'addCourse',
  about: 'about',
  cart: 'cart',
};

const routesConfig = new Map([
  [[ROUTES.home], { name: 'Main', title: 'Main page', path: '/', template: 'index', visible: true }],
  [
    [ROUTES.courses],
    { name: 'Courses', title: 'Courses', path: PATH_COURSES, template: 'courses', visible: true, controller: courses },
  ],
  [
    [ROUTES.addCourse],
    [
      { name: 'Add', title: 'Add course', path: '/add-course', template: 'course-add', visible: true },
      { path: '/add-course', method: 'post', controller: addCoursePost },
    ],
  ],
  [[ROUTES.about], { name: 'About', title: 'About us', path: '/about', template: 'about', visible: true }],
  [
    [ROUTES.cart],
    [
      { path: PATH_CART, controller: cart, name: 'Cart', title: 'Cart', template: 'about' },
      { path: PATH_CART_ADD, controller: addCoursePost, method: 'post' },
    ],
  ],
]);

const router = Router();
const menu = Array.from(routesConfig.values()).map((item) =>
  isArray(item) ? item.filter((route) => route.visible)[0] : item,
);
const expressRoutes = Array.from(routesConfig.entries()).reduce((routers, [, route]) => {
  const routes = isArray(route) ? route : [route];

  return routers.concat(
    routes.map((item) => {
      const { title, path, template, method = 'get', controller } = item;

      router[method](path, async (req, res) => {
        const tmplVars = controller ? await controller(req, res) : {};

        template && res.render(template, { title: title, routes: menu, ...(tmplVars || {}) });
      });

      return router;
    }),
  );
}, []);

module.exports = {
  expressRoutes,
};
