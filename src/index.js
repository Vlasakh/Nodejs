const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Main page' });
});

app.get('/courses', (req, res) => {
  res.render('courses', { title: 'Courses' });
});

app.get('/add', (req, res) => {
  res.render('add', { title: 'Add course' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About us' });
});

app.listen(PORT, () => {});
