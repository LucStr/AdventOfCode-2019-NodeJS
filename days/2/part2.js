var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

const codes = {
    1: (a, b) => a + b,
    2: (a, b) => a * b
}

function run(data, noun, verb){
    data[1] = noun;
    data[2] = verb;
    
    for(var i = 0; i < data.length; i += 4){
        var code = codes[data[i]];
        if(data[i] == 99)
            break;
        data[data[i + 3]] = code(data[data[i + 1]], data[data[i + 2]]);
    }

    return data[0];
}

for(var i = 0; i < 100; i++){
    for(var j = 0; j < 100; j++){
        var output = run([...data], i, j);
        if(output == 19690720){
            console.log(100 * i + j);
            return;
        }
    }
}