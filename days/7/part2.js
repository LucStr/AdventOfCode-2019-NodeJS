const {IntCodeComputer} = require('./../intCode');
var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var combos = getAllCombinationsFor([5, 6, 7, 8, 9]);
//var combos = getAllCombinationsFor([0, 1, 2, 3, 4]).reduce((a, b) => {a.push(...bigCombos.map(e => [...b, ...e])); return a} , []);
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
    var amplifiers = new Array(5).fill(0).map(() => new IntCodeComputer([...data]));
    var value = 0;
    
    amplifiers.forEach((e, i) => {
        e.addInput(settings[i]);
    });

    while(!amplifiers[amplifiers.length - 1].halted){
        for(var i = 0; i < amplifiers.length; i++){
            var amplifier = amplifiers[i];
            if(!amplifier.halted){
                amplifier.addInput(value);
                var res = amplifier.run()[0];
                if(!res){
                    break;                    
                }else {
                    value = res;
                }
            }
        }
    }

    return {settings, value};
}

console.log(result);