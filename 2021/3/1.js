const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

const bitCount = {};

for (let i = 0; i < 12; i++) {
    bitCount[i] = 0;
}

instructions.forEach(binaryNumber => {
    const bits = binaryNumber.split('');

    bits.forEach((b, i) => {
        if (b === '0') {
            bitCount[i] -= 1;
        } else {
            bitCount[i] += 1;
        }
    });
})

let result = '';
let invertedResult = '';

for (let i = 0; i < 12; i++) {
    if (bitCount[i] > 0) {
        result += '0';
        invertedResult += '1';
    } else {
        result += '1';
        invertedResult += '0';
    }
}

console.log(parseInt(result, 2) * parseInt(invertedResult, 2));