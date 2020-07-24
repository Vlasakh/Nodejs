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
  [
    [ROUTES.courses],
    // todo: проверить одиночный роут
    [
      { name: 'Courses', title: 'Courses', path: '/courses', template: 'courses', visible: true },
      { path: '/courses', method: 'post', controller: post },
    ],
  ],
  [
    [ROUTES.addCourse],
    { name: 'Add', title: 'Add course', path: '/add-course', template: 'course-add', visible: true },
  ],
  [[ROUTES.about], { name: 'About', title: 'About us', path: '/about', template: 'about', visible: true }],
]);

const router = Router();
const expressRoutes = Array.from(routesConfig.entries()).map(([, route]) => {
  const menu = Array.from(routesConfig.values()).map((item) =>
    isArray(item) ? item.filter((route) => route.visible)[0] : item,
  );
  const routes = '';
  const { title, path, template } = route;

  return router.get(path, (req, res) => {
    res.render(template, { title: title, routes: menu });
  });
});

module.exports = {
  expressRoutes,
};
