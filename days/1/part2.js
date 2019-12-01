const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

var result = data.map(Number).map(fuel => {
    var current = 0;
    while((fuel = Math.floor(fuel / 3) - 2) > 0){
        current += fuel;
    }
    return current;
}).reduce((a, b) => a + b)

console.log(result);