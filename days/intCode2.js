class IntCodeComputer{
    constructor(data, continueOnOutput){
        this.memory = [...data];
        this.inputData = [];
        this.index = 0;
        this.relativeBase = 0;
        this.halted = false;
        this.continueOnOutput = !!continueOnOutput;
        this.outputHandler = () => {}
    }

    onOutput(outputHandler){
        this.outputHandler = outputHandler;
    }

    addInput(input){
        if(input.length){
            this.inputData.push(...input);
        }else{
            this.inputData.push(input);
        }
    }

    run(){
        this.halted = false;

        var operationSize = {
            1: 3,
            2: 3,
            3: 1,
            4: 1,
            5: 0,
            6: 0,
            7: 3,
            8: 3,
            9: 1,
            99:0,
        }
        
        var operations = {
            1: (a, b, c) => this.memory[c] = this.memory[a] + this.memory[b],
            2: (a, b, c) => this.memory[c] = this.memory[a] * this.memory[b],
            3: (a) => this.memory[a] = this.inputData.shift(),
            4: (a) => { this.outputHandler(this.memory[a]); this.halted = !this.continueOnOutput; },
            5: (a, b) => this.index = this.memory[a] !== 0 ? this.memory[b] : this.index + 2,
            6: (a, b) => this.index = this.memory[a] === 0 ? this.memory[b] : this.index + 2,
            7: (a, b, c) => this.memory[c] = this.memory[a] < this.memory[b] ? 1 : 0,  
            8: (a, b, c) => this.memory[c] = this.memory[a] === this.memory[b] ? 1 : 0,
            9: (a) => this.relativeBase += this.memory[a], 
            99: () => this.halted = true,
        }

        var paramterProviders = {
            0: (p) => this.memory[this.index + p],
            1: (p) => this.index + p,
            2: (p) => this.relativeBase + this.memory[this.index + p],
        }

        while(!this.halted){
            var instruction = this.memory[this.index++];
            var opCode = instruction % 100;        
            instruction = ~~(instruction / 100);

            var parameterConfig = new Array(operationSize[opCode]).fill(0);
            var parameterIndex = 0;
            while(instruction > 0){
                parameterConfig[parameterIndex] = instruction % 10;
                instruction = ~~(instruction / 10);
                parameterIndex++;
            }

            operations[opCode].apply(this, parameterConfig.map((config, index) => {
                var pointer = paramterProviders[config](index);
                if(!this.memory[pointer]){
                    this.memory[pointer] = 0;
                }
                return pointer;
            }));

            this.index += operationSize[opCode];
        }
    }    
}

exports.IntCodeComputer = IntCodeComputer;
