const path = require('path');
const { Router } = require('express');

const todo = require('./todo');

const getRoutes = ({ app }) => {
  const router = Router();

  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });

  router.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app.js'));
  });

  app.use('/api/todo', todo);

  return router;
};

module.exports = getRoutes;
