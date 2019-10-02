/**
 * To handle GraphQL queries, we need 
 * - a schema that defines the Query type, and 
 * - an API root with a function called a “resolver” for each API endpoint.
 */
const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root)
.then((response) => {
  console.log(response);
});