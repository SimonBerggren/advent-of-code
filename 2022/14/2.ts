import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

let totalSandUnits = 0;
let bottom = 0;

const grid = {};

inputRows.forEach((row) => {
    const edges = row.split(' -> ').map((coord) => coord.split(',').map(Number));

    for (let i = 0; i < edges.length - 1; ++i) {
        let [x1, y1] = edges[i];
        let [x2, y2] = edges[i + 1];

        [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
        [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

        bottom = Math.max(bottom, y2 + 2);

        if (x1 === x2) {
            for (let y = y1; y <= y2; ++y) {
                grid[`${x1}.${y}`] = '🪨';
            }
        } else {
            for (let x = x1; x <= x2; ++x) {
                grid[`${x}.${y1}`] = '🪨';
            }
        }
    }
});

let x = 500;
let y = 0;

while (true) {
    const straightDown = y + 1 === bottom ? true : grid[`${x}.${y + 1}`];

    if (!straightDown) {
        ++y;
        continue;
    }

    const diagonalLeft = y + 1 === bottom ? true : grid[`${x - 1}.${y + 1}`];

    if (!diagonalLeft) {
        --x;
        ++y;
        continue;
    }

    const diagonalRight = y + 1 === bottom ? true : grid[`${x + 1}.${y + 1}`];

    if (!diagonalRight) {
        ++x;
        ++y;
        continue;
    }

    grid[`${x}.${y}`] = '🟤';
    ++totalSandUnits;

    if (x === 500 && y === 0) {
        break;
    }

    x = 500;
    y = 0;
}

console.log('Answer:', totalSandUnits);
