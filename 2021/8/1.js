const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const lines = input.split('\n');
const output = lines.reduce((array, line) => array.concat(line.split(' | ')[1].split(' ')), []);

const lengths = [2, 3, 4, 7];

const count = output.reduce((count, digit) => lengths.includes(digit.length) ? count + 1 : count, 0)

console.log(count);