const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);
const { IntCodeComputer } = require('./../intCode2');
data[0] = 2;
var robot = new IntCodeComputer(data, true);
var out = '';

robot.onOutput(e => out += String.fromCharCode(e));
robot.addInput([...'A,A,B,C\n'])
robot.run();

console.log(out);
/*
var directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
]

var points = out.split('\n').reduce((a, b, y) => a.concat(b.split('').map((key, x) => {
    return {
        key : key,
        x: x,
        y: y,
        neighbors: []
    }
})), []);

points.forEach(point => {
    directions.forEach(d => {
        var neighbor = points.find(e => point.x + d.x === e.x && e.y === point.y + d.y);
        neighbor && point.neighbors.push(neighbor)
    });
});

var result = points.filter(e => e.key === '#' && e.neighbors.length === 4 && e.neighbors.every(e => e.key === '#')).reduce((a, b) => a + b.y * b.x, 0)


console.log(out);
console.log(result);*/