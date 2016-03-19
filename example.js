// Dependencies:
var mathMLTagNames = require('./index.js');

// Slicing the first 20:
var first = mathMLTagNames.slice(0, 20);
// Yields:
console.log('js', require('util').inspect(first));

// And `length`:
var length = mathMLTagNames.length;
// Yields:
console.log('js', String(length));
