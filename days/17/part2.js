const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);
const { IntCodeComputer } = require('./../intCode2');

var robot = new IntCodeComputer(data, true);
var out = '';

robot.onOutput(e => out += String.fromCharCode(e));
robot.run();

console.log(out);

var directions = [
    { key: '^', x: 0, y: -1 },
    { key: '<', x: -1, y: 0 },
    { key: 'v', x: 0, y: 1 },
    { key: '>', x: 1, y: 0 },
]

var lastDirectionIndex = directions.length - 1;

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

var steps = '';
var direction = directions.find(e => out.includes(e.key));
var position = points.find(e => e.key === direction.key);
var count = 0;
do{
    var newPos = points.find(e => e.x === position.x + direction.x && e.y === position.y + direction.y);
    if(!newPos || newPos.key !== '#'){
        if(count > 0){
            steps += count + ',';
            count = 0;
        }
        newPos = position.neighbors.find(e => e.key === '#' && e.x !== position.x - direction.x && e.y !== position.y - direction.y);
        if(newPos){
            var directionIndex = directions.findIndex(e => e === direction);
            var newDirectionIndex = directions.findIndex(({x, y}) => x === newPos.x - position.x && y === newPos.y - position.y);
            steps += isLeft(directionIndex, newDirectionIndex) ? 'L,' : 'R,';
            direction = directions[newDirectionIndex];
        }
    }
    count++;
    position = newPos;
} while(newPos)

function isLeft(old, neww){
    return [
        {o: 0, n: 1},
        {o: 1, n: 2},
        {o: 2, n: 3},
        {o: 3, n: 0},
    ].find(e => e.o === old && e.n === neww)
}
console.log(steps);
steps = steps.split(',');

var functions = {};
var current = [];
while(Object.keys(functions).length < 3){
    var first = steps.findIndex((e, i) => !Object.keys(functions).includes(e) && current.every((a, j) => steps[i + j] === a));
    var newOccurence = steps.slice(first, first + current.length + 2);
    var results = steps.map((e, i) => i).filter(i => !Object.keys(functions).includes(steps[i]) && newOccurence.every((a, j) => steps[i + j] === a));
    if(results.length === 1){
        var key = String.fromCharCode("A".charCodeAt(0) + Object.keys(functions).length);
        steps.map((e, i) => i).filter(i => i + current.length < steps.length && current.every((a, j) => steps[i + j] === a)).forEach((i, e) => {
            var index = i - e * (current.length - 1);
            steps.splice(index, current.length, key);
        });
        functions[key] = current;
        current = [];
    } else{
        current = newOccurence;
    }
}
var input = `${steps.filter(e => e).join(',')}
${functions['A']}
${functions['B']}
${functions['C']}
n
`;

data[0] = 2;
robot = new IntCodeComputer(data, true);
robot.addInput([...input].map(e => e.charCodeAt(0)))
var out = '';
var last = 0;
robot.onOutput(e => {out += String.fromCharCode(e); last = e});
robot.run();

console.log(input);
console.log(last);
