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
    });

var keys = Object.keys(snakes[1]);
var both = Object.keys(snakes[0]).filter(a => keys.includes(a));


var res = both.map(a => snakes[0][a]).sort((a, b) => {
    return (a.xabs + a.yabs) - (b.xabs + b.yabs);
})[0];

console.log(res.xabs + res.yabs);

var res = both.map(a => snakes[0][a].length + snakes[1][a].length).sort((a, b) => {
    return a - b
})[0];

console.log(res);