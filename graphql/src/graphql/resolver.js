const Todo = require('../models/todo');

const users = [
  { name: 'Fedor', age: 30, email: 'fedor@xx.com' },
  { name: 'Glofira', age: 23, email: 'glofira@xx.com' },
];

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users,
    };
  },
  random({ min, max, count }) {
    return Array(count)
      .fill()
      .map(() => Math.random() * (max - min) + min);
  },
  addTestUser({ user: { name, email } }) {
    const user = {
      name,
      email,
      age: Math.ceil(Math.random() * 30),
    };

    users.push(user);

    return user;
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
      throw new Error('Fetch todos is not available');
    }
  },

  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(id);

      todo.done = !todo.done;
      await todo.save();

      return todo;
    } catch (e) {
      throw new Error('Fetch todos is not available');
    }
  },
};
