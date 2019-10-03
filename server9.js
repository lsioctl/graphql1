const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// [int] means list of int
// ! means non nullable (it is by default)
// input are objects passed as variables
const schema = buildSchema(`
  input MessageInput {
    content: String,
    author: String
  }
  type Message {
    id: ID!,
    content: String,
    author: String
  }
  type Query {
    getMessage(id: ID!): Message
  }
  type Mutation {
    createMessage(input: MessageInput): Message,
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

const fakeDatabase = {};

function createUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}
// If Message had any complex fields, we'd put them on this object.
// Not really comfortable with this class, TODO: understand why
// it is like a very clumsy ORM :D
class Message {
  constructor(id, input) {
    this.id = id;
    this.content = input.content;
    this.author = input.author;
  }

  // feel this very awkward and redundant also
  // but at least 'database' save is on the same place
  // but database should not be outside of this class ??
  updateDB() {
    fakeDatabase[this.id] = {
      content: this.content,
      author: this.author,
    }
  }

  static create(input) {
    const message = new Message(createUUID(), input);
    message.updateDB();
    return message;
  }

  static get(id) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    const input = fakeDatabase[id];
    return new Message(id, input);
  }

  static update(id, input) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    const message = new Message(id, input);
    message.updateDB();
    return message;
  }
}

// The root provides a resolver function for each API endpoint
// Here my clumsy 'ORM' provides at least much readability
const root = {
  createMessage: ({input}) => Message.create(input),
  getMessage: ({id}) => Message.get(id),
  updateMessage: ({id, input}) => Message.update({id, input})
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/**
 * Example in GrapQLi
 * 
 * mutation A {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id,
    author,
  }
}

query B {
  getMessage(id: "ff103c89-ede0-47d5-b1f3-5586481d8902") {
    id,
    author,
    content
  }
}
 */