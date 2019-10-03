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

## ORM
I have to dig more the object/data relationship

## GraphQL

possible to use GET for caching (or play with POST Header), but seems tricky

uncaught JS erros are sent in GraphQL responses (for example, const reaffected, ...)

I feel a lot of redundancy with the Schema, the rootValue, data, objects, and even Queries
and mutation which should be named like function declaration (including parameters again ...)

A nice article about other caveats is here:

https://blog.logrocket.com/5-reasons-you-shouldnt-be-using-graphql-61c7846e7ed3/

Clearly not a silverbullet, interesting, but will try other stuff before