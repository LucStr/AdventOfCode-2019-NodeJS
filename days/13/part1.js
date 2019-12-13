const { IntCodeComputer } = new require('./../intCode2');
const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var comp = new IntCodeComputer(data, true);
var output = [];
var tiles = [];
comp.onOutput(e => {
    output.push(e);
    if(output.length < 3){
        return;
    }

    tiles.push({x: output[0], y: output[1], id: output[2]});
    output = [];
});

comp.run();
var result = tiles.filter(e => e.id === 2).length;

console.log(result);