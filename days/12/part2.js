var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');


var moons = data.map(a => {
    var u = a.match(/-?[0-9]+/g).map(Number);
    return {
        initialPos: u.map(e => e),
        pos: u,
        vel: new Array(u.length).fill(0),
    }
});

var dimensions = moons[0].pos.length;
var pairs = getAllPairs(moons);
var kgvs = new Array(dimensions);

for(var run = 0; true; run++){
    if(run % 10000 == 0){
       // console.log(run);
    }
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

    for(var i = 0; i < kgvs.length; i++){
        if(kgvs[i])
            continue;        
        if(moons.filter(moon => moon.vel[i] == 0 && moon.pos[i] == moon.initialPos[i]).length == moons.length){
            kgvs[i] = run + 1;
        }
    }

    if(kgvs.filter(e => e).length == kgvs.length){
        break;
    }
}
console.log(kgvs);
var result = getKgv(kgvs);
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

function getKgv(arr){
    return arr.sort((a, b) => b - a).reduce((a, b) => a * b / getGgt(a, b));
}

function getGgt(a, b){
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}
