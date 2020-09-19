const Todo = require('../models/todo');

module.exports = {
  random({ min, max, count }) {
    return Array(count)
      .fill()
      .map(() => Math.random() * (max - min) + min);
  },

  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error('Fetch todos is not available');
    }
  },

  async createTodo({ todo: { title } }) {
    try {
      return await Todo.create({
        title,
        done: false,
      });
    } catch (e) {
      throw new Error(`Cannot create todo ${title}`);
    }
  },

  async completeTodo({ id, title }) {
    try {
      const todo = await Todo.findByPk(id);

      todo.done = !todo.done;
      await todo.save();

      return todo;
    } catch (e) {
      throw new Error(`Cannot complete todo ${title}`);
    }
  },

  async deleteTodo({ id, title }) {
    try {
      const todos = await Todo.findAll({
        where: { id },
      });

      await todos[0].destroy();

      return true;
    } catch (e) {
      throw new Error(`Cannot delete todo ${title}`);
    }
  },
};
