const { isArray } = require('lodash');

const { PATH_HOME, PATH_COURSES, PATH_ADD_COURSE, PATH_ABOUT, PATH_CART } = require('./shareRoutes');
const routesConfig = require('./routes');

const menuPathes = [PATH_HOME, PATH_COURSES, PATH_ADD_COURSE, PATH_ABOUT, PATH_CART];

const menu = menuPathes.map((item) => routesConfig.find((route) => item === route.path));

module.exports = {
  menu,
};
