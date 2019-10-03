const fetch = require('node-fetch');

// So it appears that we had here operation name
// recommended in production, event when we only
// have on query and can use the query shorthand
// operation names are mandatory for multiple operations
const query = `query GetInfos {
    quoteOfTheDay,
    rollThreeDice,
    getMessage
}`

const mutation = `mutation SetMessage($message: String) {
    setMessage(message: $message)
}`

const message = 'yeeeeeees'

fetch('http://localhost:4000/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        query: mutation,
        //query,
        // warning ! short hand used there, that's why I played with diceo
        // instead of dice
        variables: { message } 
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