const data = require('fs').readFileSync(__dirname + '/data.in').toString();

let map = data
    .split('\n')
    .map((e, y) => [...e]
        .map((t, x) => { 
            return {bug: t === '#', x, y}
        }))
    .reduce((a, b) => a.concat(b))
    .map((e, i, a) => {
        e.adjacent = a.filter(f => Math.abs(f.x - e.x) + Math.abs(f.y - e.y) === 1);
        e.score = Math.pow(2, i);
        return e;
    });

let scores = [];
let result = -1;

while(scores.indexOf(result) === -1){
    scores.push(result)
    result = map.reduce((a, b) => a + (b.bug ? b.score : 0), 0)
    map.forEach(b => {
        b.count = b.adjacent.filter(e => e.bug).length;
    })
    map.forEach(b => {
        b.bug = (b.bug && b.count === 1) || (!b.bug && (b.count === 1 || b.count === 2)); 
    })
}


console.log(result);