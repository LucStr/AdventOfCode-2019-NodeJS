const data = require('fs').readFileSync(__dirname + '\\data.in').toString();
const width = 25;
const height = 6;

var pixels = [...data].map(Number);

var layers = [];

let layerIndex = 0;

while(pixels.length){
    var layerPixels = pixels.splice(0, width * height);

    layers[layerIndex] = {
        pixels: layerPixels,
        zeroDigits: layerPixels.filter(e => e == 0).length,
        oneDigits: layerPixels.filter(e => e == 1).length,
        twoDigits: layerPixels.filter(e => e == 2).length,
    };

    layerIndex++;
}

var layer = layers.sort((a, b) => a.zeroDigits - b.zeroDigits)[0];
var result = layer.oneDigits * layer.twoDigits;

console.log(result);