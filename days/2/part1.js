var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

const codes = {
    1: (a, b) => a + b,
    2: (a, b) => a * b
}

data[1] = 12;
data[2] = 2;

for(var i = 0; i < data.length; i += 4){
    var code = codes[data[i]];
    if(data[i] == 99)
        break;
    data[data[i + 3]] = code(data[data[i + 1]], data[data[i + 2]]);
}


var result = data[0];

console.log(result);