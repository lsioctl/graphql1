const fetch = require('node-fetch');

fetch('http://localhost:4000/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({query: "{ hello }"})
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