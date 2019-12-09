const {run} = require('./../intCode');
const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var combos = getAllCombinationsFor([0, 1, 2, 3, 4]);
var runs = combos.map(runSettings).sort((a, b) => b.value - a.value);
result = runs[0].value;

function getAllCombinationsFor(arr){
    var result = [];
    if(arr.length == 1){
        return arr;
    }
    for(var i = 0; i < arr.length; i++){
        var newArr = [...arr];
        newArr.splice(i, 1);
        getAllCombinationsFor(newArr).forEach(element => {
            if(element.length){
                result.push([arr[i], ...element]);  
            }else{
                result.push([arr[i], element]); 
            }
        });
    }

    return result;
}

function runSettings(settings){
    var value = 0;
    
    for(var i = 0; i < settings.length; i++){
        value = runAmplifier(settings[i], value);
    }

    return {settings, value};
}

function runAmplifier(setting, input){
    return run([...data], [setting, input])[0];
}

console.log(result);