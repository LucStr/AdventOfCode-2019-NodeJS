var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('').map(Number);
//data = '69317163492948606335995924319873'.split('').map(Number);
var pattern = [0, 1, 0, -1];

for(var i = 0; i < 100; i++){
    data = data.map((e, i) => {
        var nums = data.map((k, u) => k * pattern[Math.floor((u + 1) / (i + 1)) % 4]);
        return Math.abs(nums.reduce((a, b) => a + b) % 10)
    });
}

var result = data.map(e => e.toString()).slice(0, 8).join('');

console.log(result);