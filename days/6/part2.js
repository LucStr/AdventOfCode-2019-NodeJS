const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n').map(a => a.split(')'));

var orbits = {'COM': []};
var curr = ['COM'];

while(curr.length){
    var newCurr = [];

    data.filter(a => curr.includes(a[0])).forEach(e => {
        orbits[e[1]] = [...orbits[e[0]], e[0]];
        newCurr.push(e[1]);
    });

    curr = newCurr;
}

var you = orbits['YOU'].reverse();
var san = orbits['SAN'];

var k = you.find(e => san.includes(e));
var count = you.indexOf(k) + san.length - san.indexOf(k) - 1;

console.log(count);