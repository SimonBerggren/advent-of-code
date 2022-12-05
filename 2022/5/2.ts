import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const stacks: string[] = [];
let parseInstructions = false;

inputRows.forEach((row) => {
    if (!row) {
        return;
    }

    if (!parseInstructions) {
        if (!row || !row.includes('[')) {
            parseInstructions = true;
            return;
        }

        if (!stacks.length) {
            for (let i = 0; i < row.length / 4; ++i) {
                stacks.push('');
            }
        }

        for (let i = 0; i < row.length; i += 4) {
            const crate = row[i + 1];
            if (crate === ' ') {
                continue;
            }

            stacks[i / 4] = `${crate}${stacks[i / 4]}`;
        }

        return;
    }

    const [num, from, to] = row.match(/\d+/g).map(Number);
    stacks[to - 1] += stacks[from - 1].slice(-num);
    stacks[from - 1] = stacks[from - 1].slice(0, -num);
});

console.log('Answer:', stacks.map((s) => s[s.length - 1]).join(''));
