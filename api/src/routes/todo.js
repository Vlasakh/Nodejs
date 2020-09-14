const path = require('path');
const { Router } = require('express');

const Todo = require('../models/todo');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
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
});

router.put('/:id', async ({ params: { id }, body: { done } }, res) => {
  try {
    const todo = await Todo.findByPk(+id);

    todo.done = done;
    await todo.save();

    res.status(200).json({ todo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = router;
