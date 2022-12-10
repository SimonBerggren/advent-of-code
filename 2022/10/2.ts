import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const instructions: number[] = [];
let register = 1;
let cycle = 0;

const width = 40;
const height = 6;
const size = width * height;
const output = new Array(size).fill('  ');

inputRows.forEach((row) => {
    const [instruction, amountStr] = row.split(' ');
    instructions.push(0);

    if (instruction === 'addx') {
        const amount = Number(amountStr);
        instructions.push(amount);
    }

    while (instructions.length) {
        const drawPosition = cycle % width;
        const spritePositions = [register - 1, register, register + 1];

        if (spritePositions.includes(drawPosition)) {
            output[cycle] = '⬜️';
        }

        ++cycle;
        const num = instructions.shift();
        register += num;
    }
});

for (let row = 0; row < size; row += width) {
    console.log(output.slice(row, row + width).join(''));
}
