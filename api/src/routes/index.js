const path = require('path');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'app.js'));
});

module.exports = router;
