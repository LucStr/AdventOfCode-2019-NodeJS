const { IntCodeComputer } = require('./../intCode');
var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var comp = new IntCodeComputer(data, true);
comp.addInput(2);
var result = comp.run();
console.log(result);