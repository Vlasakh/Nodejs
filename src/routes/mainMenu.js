const { ROUTES, PATH_COURSES } = require('./shareRoutes');
const routesConfig = require('./routes');

const menuPathes = [ROUTES.HOME, PATH_COURSES, ROUTES.CART.add, ROUTES.ABOUT, ROUTES.CART.one];

const menu = menuPathes.map((item) => routesConfig.find((route) => item === route.path));

module.exports = {
  menu,
};
