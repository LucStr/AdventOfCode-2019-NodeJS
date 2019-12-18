var data = require('fs').readFileSync(__dirname + '\\data.in').toString();

var map = data.split('\n').map((e, y) => [...e].map((type, x) => {
    return {
        x: x,
        y: y,
        type: type,
    }
})).reduce((a, b) => a.concat(b), []);

var directions = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
]

map.forEach(e => {
    e.neighbors = map.filter(n => directions.find(d => n.x === d.x + e.x && n.y === d.y + e.y));
    if(e.type !== '#'){
        e.validNeighbors = e.neighbors.filter(e => e.type !== '#');
    }
});

var position = map.find(e => e.type === '@'); 
var seen = [];
var result = findPath(position, ['@'], 0);


function findPath(position, keys, steps){
    var key = keys.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');
    var cached = seen.find(e => e.item === position && e.keys === key);
    if(cached){
        return cached.lowest + steps;
    }     
       
    var availableKeys = [];
    var found = [position];
    var queue = [position];
    var count = 0;
    while(queue.length){
        var newQueue = [];
        queue.forEach(item => {
            if(item.type !== '.' && !keys.includes(item.type.toLowerCase())){
                availableKeys.push({item, count});
                return;
            }
            var newItems = item.validNeighbors.filter(e => !found.find(u => u === e)) 
            newQueue.push(...newItems);
            found.push(...newItems);
        });
        queue = newQueue;        
        count++;
    }

    if(availableKeys.length === 0){
        return steps;
    }

    //@ item
    var lowest = Infinity;    
    
    availableKeys.filter(e => e.item.type === e.item.type.toLowerCase()).forEach(e => {
        var result = findPath(e.item, [...keys, e.item.type], e.count);
        if(result < lowest){
            lowest = result;
        }
    });

    seen.push({item: position, keys: keys.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(''), lowest: lowest})

    return lowest + steps;    
}

console.log(result);