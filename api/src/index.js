const path = require('path');
const express = require('express');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

const root = path.join(__dirname, '../public');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(root)); // static route
app.use(routes); // add routes

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Error', e);
  }
}

start();
