import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const instructions: number[] = [];
let register = 1;
let cycle = 1;

let interestingAmount = 0;
const interestingCycles = [20, 60, 100, 140, 180, 220];

inputRows.forEach((row, index) => {
    const [instruction, amountStr] = row.split(' ');
    instructions.push(0);

    if (instruction === 'addx') {
        const amount = Number(amountStr);
        instructions.push(amount);
    }

    while (instructions.length) {
        const num = instructions.shift();
        register += num;
        ++cycle;

        if (interestingCycles.includes(cycle)) {
            interestingAmount += cycle * register;
        }
    }
});

console.log('Answer:', interestingAmount);
