const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const { expressRoutes } = require('./routes');

const PORT = process.env.PORT || 3000;

const DB_URL = 'mongodb+srv://vlasakh:0hUclZn780yKe7Wz@cluster0.inerk.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

/*** plug-in handlebars */
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

/*** static route */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/*** add routes */
expressRoutes.forEach((route) => app.use(route));

async function start() {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Error', e);
  }
}

start();
