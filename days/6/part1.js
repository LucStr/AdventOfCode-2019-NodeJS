const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n').map(a => a.split(')'));

var orbits = {'COM': 0};
var curr = ['COM'];

while(curr.length){
    var newCurr = [];

    data.filter(a => curr.includes(a[0])).forEach(e => {
        orbits[e[1]] = orbits[e[0]] + 1;
        newCurr.push(e[1]);
    });

    curr = newCurr;
}

console.log(Object.values(orbits).reduce((a, b) => a + b));