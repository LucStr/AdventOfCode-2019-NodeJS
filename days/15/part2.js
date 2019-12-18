const { IntCodeComputer } = require('./../intCode3');
const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

class Point{
    constructor(type, x, y){
        this.x = x;
        this.y = y;
        this.type = type;
        this.neighbors = {};
    }

    getNeighbor(direction){
        return this.neighbors[direction];
    }

    addNeighbor(direction, point){
        this.neighbors[direction] = point;
        point.neighbors[SWITCH[direction]] = this;
    }
}

const SWITCH = {
    'NORTH': 'SOUTH',
    'SOUTH': 'NORTH',
    'EAST': 'WEST',
    'WEST': 'EAST',
}

const MOVEMENT = {
    'NORTH': {name: 'NORTH', key: 1, x: 0, y: 1 },
    'EAST': { name: 'EAST', key: 4, x: 1, y: 0 },
    'SOUTH': { name: 'SOUTH', key: 2, x: 0, y: -1 },
    'WEST': { name: 'WEST', key: 3, x: -1, y: 0 },
};

const droid = new IntCodeComputer(data, false, true);

var allDirections = Object.values(MOVEMENT);

const pointZero = new Point(3, 0, 0);

var points = [pointZero];

run(pointZero);

function run(point){
    allDirections.forEach(d => {
        var neighbor = points.find(e => e.x === point.x + d.x && e.y === point.y + d.y);
        if(!neighbor){
            droid.addInput(d.key);
            var out = droid.run();
            neighbor = new Point(out, point.x + d.x, point.y + d.y);
            points.push(neighbor);
            if(out !== 0){
                run(neighbor);
                droid.addInput(MOVEMENT[SWITCH[d.name]].key);
                droid.run();
            }
        }
        point.addNeighbor(d.name, neighbor);  
    })
}

var xMin = points.sort((a, b) => a.x - b.x)[0].x;
var xMax = points.sort((a, b) => b.x - a.x)[0].x;
var yMin = points.sort((a, b) => a.y - b.y)[0].y;
var yMax = points.sort((a, b) => b.y - a.y)[0].y;

var out = '';
var translate = {
    0: '#',
    1: '.',
    2: 'O',
    3: '+'
}

for(var y = yMin; y <= yMax; y++){
    for(var x = xMin; x <= xMax; x++){
        var point = points.find(e => e.x === x && e.y === y);
        out += translate[point ? point.type : 0];
    }
    out += '\n';
}

const oxygen = points.find(e => e.type === 2);

var found = [oxygen];
var queue = [oxygen];
var count = 0;
while(queue.length){
    var newQueue = [];

    queue.forEach(p => {
        neighbors = Object.values(p.neighbors).filter(e => e.type !== 0 && !found.includes(e));
        found.push(...neighbors);
        newQueue.push(...neighbors);
    });

    queue = newQueue;
    count++;
}

console.log(count - 1);