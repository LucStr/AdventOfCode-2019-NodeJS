var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('').map(Number);

const baseOffset = Number(data.slice(0, 7).join(""))
const times = Math.ceil((data.length * 10000 - baseOffset) / data.length)

const digits = new Array(times).fill(0)
    .reduce((a, b) => a.concat(...data), [])
    .slice(baseOffset % data.length)

for (let i = 0; i < 100; i++) {
    for (let j = digits.length - 2; j >= 0; j--) {
        const digit = digits[j] + digits[j + 1]
        digits[j] = Math.abs(digit) % 10
    }
}

result = digits.slice(0, 8).join("")

console.log(result);