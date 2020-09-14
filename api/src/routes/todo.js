const path = require('path');
const { Router } = require('express');

const Todo = require('../models/todo');

const router = Router();

router.get('/', (req, res) => {
  res.json({ some: 22 });
});

router.post('/', async ({ body: { title } = {} }, res) => {
  try {
    const todo = await Todo.create({
      title,
      done: false,
    });

    res.status(201).json({ todo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.put('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.delete('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = router;
