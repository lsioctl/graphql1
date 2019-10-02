const fetch = require('node-fetch');

const sides = 5;
const rolls = 3;

// still feel redundancy here, as it fails if 
// I forgot non null constraint
const query = `query GetStop($sides: Int, $rolls: Int!) {
    quoteOfTheDay,
    getStop(numSides: $sides) {
        roll(numRolls: $rolls)
    }
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
        variables: { sides, rolls } 
    })
})
.then(r => r.json())
// not without stringify [Array] instead of array content is printed
.then(r => console.log(JSON.stringify(r)))
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