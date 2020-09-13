const Sequelize = require('sequelize');

const DB_NAME = 'node-todo';
const USER_NAME = 'root';
const PASS = process.env.auth;

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
