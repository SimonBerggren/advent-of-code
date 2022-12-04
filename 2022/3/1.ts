import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const upperAlphabet = lowerAlphabet.toUpperCase();

let totalSum = 0;

inputRows.forEach((row) => {
    if (!row) {
        return;
    }
    const c1 = row.slice(0, row.length / 2);
    const c2 = row.slice(row.length / 2);
    const duplicates: { [key in string]: number } = {};

    c1.split('').forEach((char) => {
        if (c2.includes(char)) {
            let index = lowerAlphabet.indexOf(char);
            if (index >= 0) {
                duplicates[char] = index + 1;
            } else {
                index = upperAlphabet.indexOf(char);
                duplicates[char] = index + 27;
            }
        }
    });
    const sum = Object.values(duplicates).reduce((a, b) => a + b);
    totalSum += sum;
});

console.log('Answer:', totalSum);
