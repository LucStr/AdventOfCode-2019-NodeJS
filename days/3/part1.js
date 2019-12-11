const data = require('fs').readFileSync(__dirname + '\\data.in').toString();

var multiplier = {
    'U': {x: 0, y: 1},
    'D': {x: 0, y: -1},
    'R': {x: 1, y: 0},
    'L': {x: -1, y: 0}
}

var snakes = data
    .split('\n')
    .map(a => a
        .split(',')
        .map(a => {
            var chars = [...a]
            return {
                direction: chars.shift(),
                number: Number(chars.join('')),
            };
        }))
    .map(a => {
        var x = 0;
        var y = 0;
        var ans = {};
        var length = 0;

        a.forEach(p => {
            var mult = multiplier[p.direction];

            for(var i = 0; i < p.number; i++){
                x += mult.x;
                y += mult.y;

                ans[`${x}:${y}`] = {
                    x: x,
                    y: y,
                    length: ++length,
                    xabs: Math.abs(x),
                    yabs: Math.abs(y)
                };
            }
        });
        
        return ans;
            /*
            var xold = x;
            var yold = y;

            x += mult['x'] * p.number;
            y += mult['y'] * p.number;

            return {
                xs: x < xold ? x : xold,
                xsabs: Math.abs(Math.abs(x) < Math.abs(xold) ? x : xold),
                ys: y < yold ? y : yold,
                ysabs: Math.abs(Math.abs(y) < Math.abs(yold) ? y : yold),
                xl: x < xold ? xold : x,
                yl: y < yold ? yold : y
            }*/
        /*.sort((a, b) => {
            return (a.xsabs + a.ysabs) - (b.xsabs + b.ysabs);
        });*/
    });
//console.log(snakes);

var keys = Object.keys(snakes[1]);
var both = Object.keys(snakes[0]).filter(a => keys.includes(a));
//console.log(both);

var res = both.map(a => snakes[0][a]).sort((a, b) => {
    return (a.xabs + a.yabs) - (b.xabs + b.yabs);
})[0];

console.log(res.xabs + res.yabs);

var res = both.map(a => snakes[0][a].length + snakes[1][a].length).sort((a, b) => {
    return a - b
})[0];

console.log(res);

/*var i = 0;
var cross = [];
while(!cross.length && i < snakes[0].length){
    var line = snakes[0][i];
    var isX = line.xs == line.xl;
    var abs = line.xsabs + line.ysabs;


    cross = snakes[1].filter(a => (isX && a.ys == a.yl && a.ys <= line.yl && a.ys >= line.ys && a.xs <= line.xs && line.xs <= a.xl) 
                              || (!isX && a.xs == a.xl && a.xs <= line.xl && a.xs >= line.xy && a.ys <= line.ys && line.ys <= a.yl));

}
console.log(cross);
*/