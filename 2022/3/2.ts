import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const upperAlphabet = lowerAlphabet.toUpperCase();

let totalSum = 0;

for (let i = 0; i < inputRows.length; i += 3) {
    const g1 = inputRows[i];
    const g2 = inputRows[i + 1];
    const g3 = inputRows[i + 2];

    let sum = 0;

    g1.split('').forEach((char) => {
        if (g2.includes(char) && g3.includes(char)) {
            let index = lowerAlphabet.indexOf(char);
            if (index >= 0) {
                sum = index + 1;
            } else {
                index = upperAlphabet.indexOf(char);
                sum = index + 27;
            }
        }
    });

    totalSum += sum;
}

console.log('Answer:', totalSum);
