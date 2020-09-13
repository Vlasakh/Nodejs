const path = require('path');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ some: 22 });
});

router.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.put('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.delete('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = router;
