import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();

let answer = 0;
let comparingString = input.slice(0, 4);
for (let i = 14; i < input.length; ++i) {
    if (answer > 0) {
        break;
    }
    for (let c = 0; c < comparingString.length; ++c) {
        const char = comparingString[c];
        const multipleMatches = comparingString.match(new RegExp(char, 'g'));
        if (multipleMatches.length > 1) {
            break;
        } else if (c === comparingString.length - 1) {
            answer = i;
            console.log(comparingString);
        }
    }
    comparingString = input.slice(i - 13, i + 1);
}

console.log('Answer:', answer);
