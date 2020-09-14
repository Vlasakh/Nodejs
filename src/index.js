const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const { expressRoutes } = require('./routes');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;

const DB_URL = `mongodb+srv://vlasakh:${process.env.auth}@cluster0.inerk.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();

/*** plug-in handlebars */
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById('5f51b0c83575d2b88d392e8f');

    next();
  } catch (e) {
    console.error('e', e);
  }
});

/*** static route */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/*** add routes */
expressRoutes.forEach((route) => app.use(route));

async function start() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'zz@xx.com',
        name: 'Vlasakh',
        cart: { items: [] },
      });
      await user.save();
    }

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Error', e);
  }
}

start();
