const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

var result = data.map(Number).map(a => Math.floor(a / 3) - 2).reduce((a, b) => a + b);

console.log(result);