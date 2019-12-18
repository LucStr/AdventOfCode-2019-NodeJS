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
    2: '*',
    3: '+'
}

for(var y = yMin; y <= yMax; y++){
    for(var x = xMin; x <= xMax; x++){
        var point = points.find(e => e.x === x && e.y === y);
        out += translate[point ? point.type : 0];
    }
    out += '\n';
}

console.log(out);

var found = [pointZero];
var queue = [pointZero];
var count = 0;
var result = false;
while(!result){
    var newQueue = [];

    queue.forEach(p => {
        neighbors = Object.values(p.neighbors).filter(e => e.type !== 0 && !found.includes(e));
        found.push(...neighbors);
        var gas = neighbors.find(e => e.type === 2);
        if(gas){
            result = gas;
        }
        newQueue.push(...neighbors);
    });

    queue = newQueue;
    count++;
}



console.log(count);


/*
async function run(point, back){
    if(Object.keys(point.neighbors).length < 4){
        var directions = allDirections.filter(e => !Object.keys(point.neighbors).includes(e.name));
        
        for(var i = 0; i < directions.length; i++){
            var d = directions[i];
            droid.addInput(d.key);
            await new Promise((resolve) => {
                droid.onOutput(out => {
                    var neighbor = new Point(out, d.x + point.x, d.y + point.y);
                    points.push(neighbor);
                    point.addNeighbor(d.name, neighbor);
                    setTimeout(async () => {
                        await run(neighbor, SWITCH[d.name]);
                        resolve();
                    }, 0);
                });
    
                droid.run();
            });            
        }

        if(back){
            droid.addInput(MOVEMENT[back].key);
            droid.onOutput(() => {});
            droid.run();
        }         
    }
}

/*while(queue.length){
    var { point, directions, tail } = queue.shift();
    directions.forEach(d => {
        droid.addInput(d.key);

        droid.onOutput(out => {
            var neighbor = new Point(out, d.x + point.x, d.y + point.y);
            point.addNeighbor(neighbor);
            
            if(out === 0){
                return;
            }

            droid.addInput(MOVEMENT[SWITCH[d.name]].key);
            droid.onOutput(() => {});
            droid.run();

            var unknownDirections = [];
            allDirections.forEach(d => {
                var point = points.find(p => p.x === neighbor.x + d.x && p.y === neighbor.y + d.y);
                if(point){
                    point.addNeighbor(neighbor);
                } else{
                    unknownDirections.push(d);
                }
            });

            queue.unshift({
                
            })
        });

        droid.run();
    })
    
}

(async () => {
    await run(pointZero, false);
    console.log(points.length)
})();*/