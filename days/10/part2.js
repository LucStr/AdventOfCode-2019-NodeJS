var data = require('fs').readFileSync(__dirname + '\\data.in').toString();

var grid = data.split('\n').map(a => [...a]);

var max = 0;
var xMax = 17;
var yMax = 23;

function getAngle(x, y) {
    return ((Math.atan2(y, -x) * 180) / Math.PI + 270 ) % 360;
}


var ast = getAsteoridsInSight(yMax, xMax).map(e => {
    e.angle = getAngle(-e.x, -e.y);
    return e;
}).sort((a, b) => b.angle - a.angle);

//don't ask me why lmao
var result = ast[198];
console.log(ast.indexOf(ast.find(e => e.xOriginal == 8 && e.yOriginal == 2)));

console.log(result.xOriginal * 100 + result.yOriginal);

function getRelativeGrid(y, x){
    var relativeGrid = [];

    data.split('\n').forEach((a, yd) => [...a].map((e, xd) => {
        if(xd === x && yd === y){
            return;
        }
        relativeGrid.push({x: xd - x, y: yd - y, a: e === '#', xOriginal: xd, yOriginal: yd})
    }))

    return relativeGrid;
}

function getAsteoridsInSight(y, x){
    relativeGrid = getRelativeGrid(y, x);
    
    relativeGrid.forEach(element => {
        if(!element.a)
            return;

        var teiler = ggt(element.x, element.y);
        var x = element.x / teiler;
        var y = element.y / teiler;

        var next = relativeGrid.find(e => e.x === x && e.y === y);
        var closest;
        while(next){
            if(next.a && !closest){
                closest = next;
            }
            next.a = false;
            var next = relativeGrid.find(e => e.x === next.x + x && e.y === next.y + y);
        }

        closest.a = true;
    });
    
    return relativeGrid.filter(a => a.a);
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