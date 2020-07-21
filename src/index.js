const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { expressRoutes, route } = require('./routes');

const PORT = process.env.PORT || 3000;

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

/*** add routes */
expressRoutes.forEach((route) => app.use(route));

app.listen(PORT, () => {});
