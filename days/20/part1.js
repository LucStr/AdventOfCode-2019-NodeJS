let grid = require('fs').readFileSync(__dirname + '/data.in').toString();

grid = grid.split('\n').map((a, y) => [...a].map((e, x) => {return {type: e, x, y}}));

const adjacents = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
]

const tiles = [];

grid.forEach((row, y) => {
    row.forEach((item, x) => {
        item.adjacents = adjacents.map(a => grid[y + a.y] && grid[y + a.y][x + a.x]).filter(e => e);
        if(item.type == '.'){
            tiles.push(item)
            item.valid = item.adjacents.filter(e => e.type === '.')
        }
    })
})

const portals = [];

tiles.forEach(t => {
    const portal = t.adjacents.find(a => a.type.match(/[A-Z]/));
    if(!portal)
        return;
    const second = portal.adjacents.find(a => a.type.match(/[A-Z]/));
    const name = [portal, second]
        .sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x)
        .map(a => a.type).join('');
    
    portal.type = name;
    portal.effectiveTile = portal.adjacents.find(e => e.type === '.')
    portals.push(portal)
});

portals.forEach((p, i) => {
    if(p.type === 'AA' || p.type === 'ZZ')
        return;
    const secondTile = portals.find((e, ii) => i !== ii && e.type === p.type).effectiveTile;
    p.effectiveTile.valid.push(secondTile);
});

var start = portals.find(p => p.type === 'AA').effectiveTile;
var end = portals.find(p => p.type === 'ZZ').effectiveTile;

var queue = [start];
var visited = [start];
var count = 0;
while(!queue.find(e => e === end)){
    visited.push(...queue)
    queue = queue
        .map(e => 
            e.valid.filter(v => !visited.find(f => f === v)))
        .reduce((a, b) => a.concat(...b), []);
    count++;
}


console.log(count);