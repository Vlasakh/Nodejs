const { Router } = require('express');
const { isArray } = require('lodash');

const { post } = require('./add-course');

const ROUTES = {
  home: 'home',
  courses: 'courses',
  addCourse: 'addCourse',
  about: 'about',
};

const routesConfig = new Map([
  [[ROUTES.home], { name: 'Main', title: 'Main page', path: '/', template: 'index', visible: true }],
  [[ROUTES.courses], { name: 'Courses', title: 'Courses', path: '/courses', template: 'courses', visible: true }],
  [
    [ROUTES.addCourse],
    [
      { name: 'Add', title: 'Add course', path: '/add-course', template: 'course-add', visible: true },
      { path: '/add-course', method: 'post', controller: post },
    ],
  ],
  [[ROUTES.about], { name: 'About', title: 'About us', path: '/about', template: 'about', visible: true }],
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

      router[method](path, (req, res) => {
        const tmplVars = controller ? controller(req, res) : {};

        template && res.render(template, { title: title, routes: menu, ...(tmplVars || {}) });
      });

      return router;
    }),
  );
}, []);

module.exports = {
  expressRoutes,
};
