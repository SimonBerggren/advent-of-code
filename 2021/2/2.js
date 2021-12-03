const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

let x = 0
let y = 0;
let aim = 0;

instructions.forEach(instrunction => {
    const split = instrunction.split(' ');
    const direction = split[0];
    const length = Number(split[1]);

    if (direction === 'forward') {
        x += length;
        y += aim * length;
    } else if (direction === 'up') {
        aim -= length;
    } else if (direction === 'down') {
        aim += length;
    }
 });

 console.log(x * y);