let data = require('fs').readFileSync(__dirname + '/data.in').toString();

let map = data
    .split('\n')
    .map((e, y) => [...e]
        .map((t, x) => { 
            return {bug: t === '#', x, y, z: 0}
        }))
    .reduce((a, b) => a.concat(b))
    .filter(e => !(e.x === 2 && e.y === 2))
    .map((e, i, a) => {
        e.adjacent = a.filter(f => Math.abs(f.x - e.x) + Math.abs(f.y - e.y) === 1);
        return e;
    });

let lowestLayer = 0;
let highestLayer = 0;

for(let i = 0; i < 200; i++){
    if(map.find(e => e.z === lowestLayer && e.bug)){
        addInnerLayer(lowestLayer--)
    }
    if(map.find(e => e.z === highestLayer && e.bug)){
        addOuterLayer(highestLayer++)
    }

    map.forEach(b => {
        b.count = b.adjacent.filter(e => e.bug).length;
    })
    map.forEach(b => {
        b.bug = (b.bug && b.count === 1) || (!b.bug && (b.count === 1 || b.count === 2)); 
    })
}

console.log(map.filter(e => e.bug).length)


function getLayer(layer){
    return new Array(25).fill(0)
    .map((e, i) => {return {bug: false, x: i % 5, y: Math.floor(i / 5), z: layer}})
    .filter(e => !(e.x === 2 && e.y === 2))
    .map((e, i, a) => {
        e.adjacent = a.filter(f => Math.abs(f.x - e.x) + Math.abs(f.y - e.y) === 1);
        return e;
    });

}

function addInnerLayer(lowestLayer){
    let outerTiles = map.filter(e => e.z === lowestLayer);
    let innerTiles = getLayer(lowestLayer - 1)
    connectTiles(outerTiles, innerTiles);
    map.push(...innerTiles);
}

function addOuterLayer(highestLayer){
    let innerTiles = map.filter(e => e.z === highestLayer);
    let outerTiles = getLayer(highestLayer + 1);
    connectTiles(outerTiles, innerTiles);
    map.push(...outerTiles)
}

function connectTiles(outer, inner){
    var north = outer.find(e => e.x === 2 && e.y === 1);
    var east = outer.find(e => e.x === 3 && e.y === 2);
    var south = outer.find(e => e.x === 2 && e.y === 3);
    var west = outer.find(e => e.x === 1 && e.y === 2);

    connect(north, inner.filter(e => e.y === 0))
    connect(east, inner.filter(e => e.x === 4))
    connect(south, inner.filter(e => e.y === 4))
    connect(west, inner.filter(e => e.x === 0))

    function connect(tile, adjacents){
        adjacents.forEach(e => {
            e.adjacent.push(tile);
        })
        tile.adjacent.push(...adjacents);
    }
}


function printLayer(layer){
    return new Array(25)
        .fill(0)
        .map((_, i) => map
            .find(e => e.z === layer && e.x === (i % 5) && e.y === Math.floor(i / 5)))
        .map(e => !e ? '?' : e.bug ? '#' : '.')
        .reduce((a, b, i) => a + b + ((i % 5) === 4 ? '\n' : ''), '\n')
}
