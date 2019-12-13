const { IntCodeComputer } = new require('./../intCode2');
const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

data[0] = 2;

var comp = new IntCodeComputer(data, true);
var output = [];
var tiles = [];

var converter = {
    0: ' ',
    1: '|',
    2: '#',
    3: '_',
    4: 'O',
}

var score = 0;

comp.onOutput(e => {
    output.push(e);
    if(output.length < 3){
        return;
    }

    var [x, y, id] = output;
    var tile = tiles.find(t => t.x === x && t.y === y);
    if(!tile){
        tile = {x, y};
        tiles.push(tile);
    }    
    tile.id = id;   
    
    if(id === 4){
        var ball = tiles.find(e => e.id === 4);
        var pad = tiles.find(e => e.id === 3);
        if(ball && pad){
            comp.addInput(ball.x < pad.x ? -1 : ball.x > pad.x ? 1 : 0);
            /*console.log(tiles.sort((a, b) => {
                if(a.y === b.y){
                    return a.x - b.x;
                }
                return a.y - b.y;
            }).reduce((a, b) => a += (b.x === 0 ? '\n' : '') + converter[b.id], ''));*/
        }        
    }

    if(tile.x === -1 && tile.y === 0){  
        score = tile.id;
    }
    output = [];
});

comp.run();
console.log(score);