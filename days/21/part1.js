const data = require('fs').readFileSync(__dirname + '/data.in').toString().split(',').map(Number);

const {IntCodeComputer} = require('../intCode3');

const computer = new IntCodeComputer(data, true)

const program = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK
`;

let out = '';
let last;
computer.onOutput(o => {out += String.fromCharCode(o); last = o})
computer.addInput([...program].map(e => e.charCodeAt(0)))
computer.run()

console.log(out, last)
