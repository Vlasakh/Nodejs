const { Router } = require('express');

const { menu } = require('./mainMenu');
const routesConfig = require('./routes');

const router = Router();

const expressRoutes = routesConfig.map((route) => {
  const { title, path, template, method = 'get', controller } = route;

  return router[method](path, async (req, res) => {
    const tmplVars = controller ? await controller(req, res) : {};

    template && res.render(template, { title: title, routes: menu, ...(tmplVars || {}) });
  });
});

module.exports = {
  expressRoutes,
};
