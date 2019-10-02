const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

/** 
 * Construct a schema, using GraphQL schema language
 * Once again I feel redundancy here
 * we use ES6 Class for RandomStop resolver,
 * and have to write again informations in the schema
 * documentation has this RandomStop type
 * type RandomStop {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int! ): [Int]
  }
  *
  */
const schema = buildSchema(`
  type RandomStop {
    roll(numRolls: Int! ): [Int]
  }
  type Query {
    quoteOfTheDay: String
    random: Float!
    getStop(numSides: Int): RandomStop
  }
`);

/**
 * 
 * Instead of Root level resolver for RandomStop type, 
 * we can use ES6 class where resolvers are instance methods
 */

class RandomStop {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    const output = []
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
};


// The root provides a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  getStop: ({numSides}) => {
    return new RandomStop(numSides || 6);
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');