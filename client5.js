const fetch = require('node-fetch');

/**
 * 
 * From the doc:
 * When you're passing arguments in code, it's generally better 
 * to avoid constructing the whole query string yourself. Instead, 
 * you can use $ syntax to define variables in your query, 
 * and pass the variables as a separate map.
 * 
 * Using $dice and $sides as variables in GraphQL means we don't 
 * have to worry about escaping on the client side.
 * 
 * anyway I feel the query RollDice redundant here, and regarding 
 * the server side implementation, knowing that in GraphQLi,
{ 
  rollDice(numDice: 3)
}
 * works
 * 
 * 
 */

const diceo = 3;
const sides = 5;

const query = `query rollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
}`

fetch('http://localhost:4000/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        query,
        // warning ! short hand used there, that's why I played with diceo
        // instead of dice
        variables: { dice: diceo, sides } 
    })
})
.then(r => r.json())
.then(r => console.log(r))
/**
 * 
 * note for those who dare not catching :D
 * DeprecationWarning: Unhandled promise rejections are deprecated. 
 * In the future, promise rejections that are not handled will terminate 
 * the Node.js process with a non-zero exit code.
 * 
 * other note: TODO chain of Promises reject handling
 * 
 */
.catch(e => console.log(e))