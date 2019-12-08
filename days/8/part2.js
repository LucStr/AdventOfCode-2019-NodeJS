var data = require('fs').readFileSync(__dirname + '\\data.in').toString();

const width = 25;
const height = 6;

var pixels = [...data].map(Number);
var layers = [];
var layerIndex = 0;

while(pixels.length){
    layers[layerIndex] = pixels.splice(0, width * height);

    layerIndex++;
}

layers = layers.reverse();

var final = [];
for(var i = 0; i < width * height; i++){
    for(var j = 0; j < layerIndex; j++){
        if(layers[j][i] < 2){
            final[i] = layers[j][i];
        }
    }
}

var out = '';
for(var y = 0; y < height; y++){
    out += final.slice(y * width, y * width + width).map(a => a === 0 ? ' ' : a).join('') + '\n';
}
console.log(out);