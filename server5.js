const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// [int] means list of int
// ! means non nullable (it is by default)
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// we use ES6 destructuring assignment for the parameters
// as we now what format they will be
function rollDice({ numDice, numSides }) {
  const output = [];
  for (let i = 0;  i < numDice; i++) {
    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  }
  return output;
}

// The root provides a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  // we use here ES6 Object litteral shorthand to avoid
  // rollDice: rollDice
  rollDice
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');