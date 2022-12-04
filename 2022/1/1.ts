import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

let mostCarriedCalories = 0;

let currentCarriedCalories = 0;
inputRows.forEach((row) => {
    if (!row) {
        if (currentCarriedCalories > mostCarriedCalories) {
            mostCarriedCalories = currentCarriedCalories;
        }
        currentCarriedCalories = 0;
    } else {
        currentCarriedCalories += Number(row);
    }
});

console.log('Answer:', mostCarriedCalories);
