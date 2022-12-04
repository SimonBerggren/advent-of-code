import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

let totalOverlaps = 0;

inputRows.forEach((row) => {
    const [s1, s2] = row.split(',');
    const [s1min, s1max] = s1.split('-').map(Number);
    const [s2min, s2max] = s2.split('-').map(Number);

    if (s1min >= s2min && s1max <= s2max) {
        totalOverlaps += 1;
    } else if (s2min >= s1min && s2max <= s1max) {
        totalOverlaps += 1;
    }
});

console.log('Answer', totalOverlaps);
