import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

const carriedCalories: number[] = [];

let currentCarriedCalories = 0;
inputRows.forEach((row) => {
    if (!row) {
        carriedCalories.push(currentCarriedCalories);
        currentCarriedCalories = 0;
    } else {
        currentCarriedCalories += Number(row);
    }
});

console.log(
    'Answer:',
    carriedCalories
        .sort((a, b) => b - a)
        .splice(0, 3)
        .reduce((a, b) => a + b)
);
