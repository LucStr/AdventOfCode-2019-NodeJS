const { IntCodeComputer } = require('./../intCode');
const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var robot = new IntCodeComputer([...data]);

var directions = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0},
]

var directionPointer = 0;

var panel = {x: 0, y: 0, stage: 1};
var panels = [panel];

while(!robot.halted){
    robot.addInput(panel.stage);
    panel.stage = robot.run()[0];
    var instruction = robot.run();
    if(instruction == 0){
        directionPointer = (directionPointer + directions.length - 1) % directions.length;
    }
    if(instruction == 1){
        directionPointer = (directionPointer + 1) % directions.length;
    }
    var direction = directions[directionPointer];
    var newPanel = panels.find(e => e.x === panel.x + direction.x && e.y === panel.y + direction.y);
    if(!newPanel){
        newPanel = {x: panel.x + direction.x, y: panel.y + direction.y, stage: 0};
        panels.push(newPanel);
    }    
    panel = newPanel;
}

var panels = panels.filter(e => e.stage);

var ySorted = panels.sort((a, b) => a.y - b.y);
var xSorted = panels.sort((a, b) => a.x - b.x);
var yMin = ySorted[0].y - 5;
var xMin = xSorted[0].y - 5;
var yMax = ySorted[ySorted.length - 1].x + 5;
var xMax = xSorted[xSorted.length - 1].x + 5;

var output = '';
for(var y = yMax; y >= yMin; y--){
    for(var x = xMin; x <= xMax; x++){
        var panel = panels.find(e => e.x === x && e.y === y);
        output += panel ? '#' : '.';
    }
    output += '\n';
}

console.log(output);