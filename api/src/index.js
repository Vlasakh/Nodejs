const path = require('path');
const express = require('express');

const sequelize = require('./utils/database');
const getRoutes = require('./routes');

const { Router } = require('express');
const router = Router();

const PORT = process.env.PORT || 3000;

const app = express();

const root = path.join(__dirname, '../public');

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(root)); // static route
app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);
app.use(getRoutes({ app })); // add routes

async function start() {
  try {
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Error', e);
  }
}

start();
