const { ROUTES } = require('./shareRoutes');
const routesConfig = require('./routes').default;

const menuPathes = [
  ROUTES.HOME,
  ROUTES.COURSE.all,
  ROUTES.COURSE.add,
  ROUTES.ABOUT,
  ROUTES.CART.one,
  ROUTES.ORDERS,
  ROUTES.MONGO,
];

const getType = (type) => {
  if (type) {
    return {
      [`type${type[0].toUpperCase() + type.slice(1)}`]: true,
    };
  }

  return null;
};

const menu = menuPathes
  .map((item) => routesConfig.find((route) => item === route.path))
  .map((route) => ({ ...route, ...getType(route.type) }));

module.exports = {
  menu,
};
