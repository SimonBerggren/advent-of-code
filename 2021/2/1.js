const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

let x = 0
let y = 0;

instructions.forEach(instrunction => {
    const split = instrunction.split(' ');
    const direction = split[0];
    const length = Number(split[1]);

    if (direction === 'forward') {
        x += length;
    } else if (direction === 'up') {
        y -= length;
    } else if (direction === 'down') {
        y += length;
    }
 });

 console.log(x * y);