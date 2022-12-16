import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const isLeftSmaller = (p1: number[] | number, p2: number[] | number) => {
    const isP1Array = Array.isArray(p1);
    const isP2Array = Array.isArray(p2);

    if (isP1Array && !isP2Array) {
        return isLeftSmaller(p1, [p2]);
    } else if (!isP1Array && isP2Array) {
        return isLeftSmaller([p1], p2);
    } else if (isP1Array && isP2Array) {
        for (let i = 0; i < Math.max(p1.length, p2.length); ++i) {
            const p1n = p1[i];
            const p2n = p2[i];

            const leftSmaller = isLeftSmaller(p1n, p2n);

            if (Array.isArray(p1n) && Array.isArray(p2n)) {
                if (leftSmaller !== undefined) {
                    return leftSmaller;
                }
            }

            if (leftSmaller !== undefined) {
                return leftSmaller;
            }
        }
        return undefined;
    }

    const compare = p1 === undefined || (p2 !== undefined && p1 < p2);

    if (p1 === p2) {
        return undefined;
    }

    return compare;
};

let indices: number[] = [];

for (let i = 0; i < inputRows.length; i += 3) {
    const p1 = JSON.parse(inputRows[i]);
    const p2 = JSON.parse(inputRows[i + 1]);

    if (isLeftSmaller(p1, p2)) {
        indices.push(i / 3 + 1);
    }
}

console.log(
    'Answer:',
    indices.reduce((i1, i2) => i1 + i2, 0)
);
