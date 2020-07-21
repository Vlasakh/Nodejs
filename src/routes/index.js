const { Router } = require('express');

const ROUTES = {
  home: 'home',
  courses: 'courses',
  addCourse: 'addCourse',
  about: 'about',
};

const routesOrder = [ROUTES.home, ROUTES.courses, ROUTES.addCourse, ROUTES.about];

const routesConfig = {
  [ROUTES.home]: { name: 'Main', title: 'Main page', path: '/', template: 'index' },
  [ROUTES.courses]: { name: 'Courses', title: 'Courses', path: '/courses', template: 'courses' },
  [ROUTES.addCourse]: { name: 'Add', title: 'Add course', path: '/add-course', template: 'course-add' },
  [ROUTES.about]: { name: 'About', title: 'About us', path: '/about', template: 'about' },
};

const routesMap = new Map(routesOrder.map((route) => [route, routesConfig[route]]));

const router = Router();
const expressRoutes = routesOrder.map((route) => {
  const { title, path, template } = routesConfig[route];

  return router.get(path, (req, res) => {
    res.render(template, { title: title, routes: routesMap.values() });
  });
});

module.exports = {
  expressRoutes,
  routesMap,
  ROUTES,
  route: Router().get(routesConfig[ROUTES.home].path, (req, res) => {
    res.render(routesConfig[ROUTES.home].template, { title: 'some' });
  }),
};
