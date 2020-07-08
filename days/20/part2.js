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
            item.valid = item.adjacents.filter(e => e.type === '.' || e.type.match(/[A-Z]/))
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
    
    portal.layerIncrease = second.adjacents.length === 4 ? 1 : -1;
    portal.type = name;
    portal.isPortal = true;
    portal.valid = portal.adjacents.filter(e => e.type === '.')
    portals.push(portal)
});

portals.forEach((portal, index) => {
    portal.other = portals.find((e, i) => e.type === portal.type && index !== i)
    portal.distances = [];
    var queue = [portal];
    var visited = [];
    var count = -1;
    while(queue.length){
        visited.push(...queue)
        portal.distances.push(...queue.filter(tile => tile.isPortal && tile !== portal).map(e => {return {portal: e, count}}))
        queue = queue
            .map(e => 
                e.valid.filter(v => !visited.find(f => f === v)))
            .reduce((a, b) => a.concat(...b), []);
        count++;
    }
})

const start = portals.find(e => e.type === 'AA')

let queue = [{portal: start, layer: 0, count: 0}]
let visited = [];
let result;

while(!result){
    const item = queue.shift();
    const {portal, layer, count} = item;

    if(visited.find(v => v.portal === portal && layer === v.layer)){
        continue;
    }

    visited.push(item);

    portal.distances.forEach(d => {
        if(layer === 0 && d.portal.type === 'ZZ'){
            result = count + d.count - 1;
        }
        if(!visited.find(e => e.portal === d.portal.other && e.layer === layer + d.portal.layerIncrease) 
            && layer + d.portal.layerIncrease >= 0 && d.portal.other){
            queue.push({portal: d.portal.other, layer: layer + d.portal.layerIncrease, count: count + d.count })
        }
    })

    queue = queue.sort((a, b) => a.count - b.count)
}

console.log(result)