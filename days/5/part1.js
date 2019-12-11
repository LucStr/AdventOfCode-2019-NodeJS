const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split(',').map(Number);

var index = 0;
var parameterConfig = [];

while(index < data.length){
    var input = data[index];
    var opCode = input % 100;
    input = Math.floor(input / 100);
    var parameterIndex = 0;
    while(input > 0){
        parameterConfig[parameterIndex] = input % 10;
        input = Math.floor(input / 10);
        parameterIndex++;
    }

    switch(opCode){
        case 1:
            opCode1();
            break;
        case 2: 
            opCode2();
            break;
        case 3:
            opCode3();
            break;
        case 4:
            opCode4();
            break;
        case 99:
            break;
        default:
            console.log("SOMETHING WENT WRONG:", data[index], opCode)
    }

    if(data[index] == 99){
        break;
    }
    parameterConfig = [];
}

function getIndex(pos){
    if(parameterConfig[pos - 1] == 1){
        return index + pos;
    }
    else{
        return data[index + pos];
    }
}

function opCode1(){
    data[getIndex(3)] = data[getIndex(1)] + data[getIndex(2)];
    index += 4;
}

function opCode2(){
    data[getIndex(3)] = data[getIndex(1)] * data[getIndex(2)];
    index += 4;
}

function opCode3(){
    data[getIndex(1)] = 1;
    index += 2;
}

function opCode4(){
    console.log("OUTPUT:", data[getIndex(1)]);
    index += 2;
}

