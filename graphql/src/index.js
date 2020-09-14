const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const sequelize = require('./utils/database');
const getRoutes = require('./routes');
const resolver = require('./graphql/resolver');
const schema = require('./graphql/schema');

const PORT = process.env.PORT || 3000;

const app = express();

const root = path.join(__dirname, '../public');

app.use(express.static(root)); // static route
// app.use(
//   express.json({
//     type: ['application/json', 'text/plain'],
//   }),
// );
app.use(getRoutes({ app })); // add routes
app.use(graphqlHTTP({ schema, rootValue: resolver, graphiql: true }));

async function start() {
  try {
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Error', e);
  }
}

start();
