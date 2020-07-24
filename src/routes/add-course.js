const post = (req, res) => {
  res.render(template, { title: title, routes: routesConfig.values() });
};

module.exports = {
  post,
};
