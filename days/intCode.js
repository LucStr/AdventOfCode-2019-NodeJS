const IntCodeComputer = function (dataInput, continueOnOutput){
    this.data = dataInput;
    this.inputIndex = 0;
    this.inputData = [];
    this.index = 0;
    this.continueOnOutput = continueOnOutput ? true : false;
}

IntCodeComputer.prototype.addInput = function(input){
    if(input.length){
        this.inputData.push(...input);
    }else{
        this.inputData.push(input);
    }
}

IntCodeComputer.prototype.run = function(){
    this.index;
    var parameterConfig = [];
    var output = [];
    var data = this.data;
    var that = this;

    while(this.index < data.length){
        var input = data[this.index];
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
                add();
                break;
            case 2: 
                multiply();
                break;
            case 3:
                assignInput();
                break;
            case 4:
                addOutput();
                if(!this.continueOnOutput){
                    return output;
                }
            case 5:
                jumpIfTrue();
                break;
            case 6:
                jumpIfFalse();
                break;
            case 7:
                assignLowerthen();
                break;
            case 8:
                assignEqualTo();
                break;
            case 99:
                
                break;
            default:
                console.log("SOMETHING WENT WRONG:", data[index], opCode)
        }
    
        if(data[this.index] == 99){
            this.halted = true;
            break;
        }
        parameterConfig = [];
    }
    
    function getIndex(pos){
        if(parameterConfig[pos - 1] == 1){
            return that.index + pos;
        }
        else{
            return data[that.index + pos];
        }
    }
    
    function add(){
        data[getIndex(3)] = data[getIndex(1)] + data[getIndex(2)];
        that.index += 4;
    }
    
    function multiply(){
        data[getIndex(3)] = data[getIndex(1)] * data[getIndex(2)];
        that.index += 4;
    }
    
    function assignInput(){
        data[getIndex(1)] = that.inputData[that.inputIndex];
        that.inputIndex++;

        that.index += 2;
    }
    
    function addOutput(){
        output.push(data[getIndex(1)]);
        that.index += 2;
    }
    
    function jumpIfTrue(){
        if(data[getIndex(1)] !== 0){
            that.index = data[getIndex(2)];
        } else{
            that.index += 3;
        }
    }
    
    function jumpIfFalse(){
        if(data[getIndex(1)] === 0){
            that.index = data[getIndex(2)];
        } else{
            that.index += 3;
        }
    }
    
    function assignLowerthen(){
        data[getIndex(3)] = (data[getIndex(1)] < data[getIndex(2)]) ? 1 : 0;
        that.index += 4;
    }
    
    function assignEqualTo(){
        data[getIndex(3)] = (data[getIndex(1)] == data[getIndex(2)]) ? 1 : 0;
        that.index += 4;
    } 
    
    return output;
}

function run(data, input){
    var comp = new IntCodeComputer(data);
    comp.addInput(input);
    return comp.run()
}

exports.run = run;
exports.IntCodeComputer = IntCodeComputer;
