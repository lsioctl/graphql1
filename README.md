# GraphQL first session

First hand in self training on GraphQL, with:

https://graphql.org/graphql-js/

The aim is also to work a bit more with express
and fetch, promises ...

After I could dive deeper with:

https://www.howtographql.com/

https://www.graphql.com/tutorials/

This one is with React and online accounts, so I would avoid it as long as possible

https://www.apollographql.com/docs/tutorial/introduction/

# What did I learn

## npm and gitignore

it is encouraged to add package lock
to have the same env. I have to think about this, for the use cases :
* when we can't use docker (and have the same ./node_modules)
* when the target server has no internet connection

## Node has no built-in fetch API

we have to install node-fetch

## JSON.stringify

Nothing magic here but usefull to avoid to do for example

```
body: '{"query": "{ hello }"}'
```

## Error handling and promise chains

I have to read further.

A nice article AFAIK

https://medium.com/@arthurxavier/error-handling-in-long-promise-chains-155f610b5bc6

"In JavaScript, asynchronous code can be handled via Promises, which are the Continuation monads of JavaScript. The most important thing in this case about Promises being a monad is that the following law is true:

Promise.resolve(Promise.resolve(x)) === Promise.resolve(x).

And more important than the one above, this one also holds for any value x:

Promise.resolve(Promise.reject(x)) === Promise.reject(Promise.resolve(x)) === Promise.reject(x).
"