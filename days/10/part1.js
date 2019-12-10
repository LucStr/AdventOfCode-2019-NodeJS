var data = require('fs').readFileSync(__dirname + '\\data.in').toString();
var grid = data.split('\n').map(a => [...a]);
var max = 0;

for(var y = 0; y < grid.length; y++){
    for(var x = 0; x < grid[y].length; x++){
        grid[y][x] = grid[y][x] === '#' ? getAsteoridsInSight(y, x) : 0;
        if(grid[y][x] > max){
            max = grid[y][x];
        }
    }
}

var output = '';
for(var y = 0; y < grid.length; y++){
    for(var x = 0; x < grid[y].length; x++){
        output += grid[y][x] == 0 ? '.' : grid[y][x] == max ? 'A' : '#';
    }
    output += '\n';
}

var result = max;

console.log(result);
console.log(output);

function getAsteoridsInSight(y, x){
    var relativeGrid = [];

    data.split('\n').forEach((a, yd) => [...a].map((e, xd) => {
        if(xd === x && yd === y){
            return;
        }
        relativeGrid.push({x: xd - x, y: yd - y, a: e === '#'})
    }))
    
    relativeGrid.forEach(element => {
        if(!element.a)
            return;

        var teiler = ggt(element.x, element.y);
        var x = element.x / teiler;
        var y = element.y / teiler;

        var next = {x, y};
        while(next){
            next.a = false;
            var next = relativeGrid.find(e => e.x === next.x + x && e.y === next.y + y);
        }

        element.a = true;
    });
    
    return relativeGrid.filter(a => a.a).length;
}

function ggt(x,y)
{
    x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		var t = y;
		y = x % y;
		x = t;
	}
	return x;
}