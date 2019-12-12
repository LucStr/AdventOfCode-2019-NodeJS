var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');


var moons = data.map(a => {
    var u = a.match(/-?[0-9]+/g).map(Number);
    return {
        pos: u,
        vel: new Array(u.length).fill(0),
    }
});

var pairs = getAllPairs(moons);

for(var i = 0; i < 1000; i++){
    pairs.forEach(({a, b}) => {
        for(var i = 0; i < a.pos.length; i++){
            if(a.pos[i] < b.pos[i]){
                a.vel[i]++;
                b.vel[i]--;
            } else if(a.pos[i] > b.pos[i]){
                a.vel[i]--;
                b.vel[i]++;
            }
        }
    });

    moons.forEach(e => {
        for (let i = 0; i < e.pos.length; i++) {
            e.pos[i] += e.vel[i];            
        }
    });
}

var result = moons.reduce((a, b) => a + b.pos.map(Math.abs).reduce((a, b) => a + b) * b.vel.map(Math.abs).reduce((a, b) => a + b), 0);
console.log(result);

function getAllPairs(arr){
    var pairs = [];
    for(var i = 0; i < arr.length; i++){
        for(var j = i + 1; j < arr.length; j++){
            pairs.push({a: arr[i], b: arr[j]});
        }
    }
    return pairs;
}
