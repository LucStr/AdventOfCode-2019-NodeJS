const data = require('fs').readFileSync(__dirname + '/data.in').toString().split(',').map(Number);

const {IntCodeComputer} = require('../intCode3');

const computer = new IntCodeComputer(data, true)

const program = `NOT A T
OR T J
NOT B T
OR T J
NOT C T
OR T J
AND D J
NOT J T
AND J T
OR E T
OR H T
AND T J
RUN
`;

let out = '';
let last;
computer.onOutput(o => {out += String.fromCharCode(o); last = o})
computer.addInput([...program].map(e => e.charCodeAt(0)))
computer.run()

console.log(out, last)
