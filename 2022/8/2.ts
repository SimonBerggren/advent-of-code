import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const grid: number[][] = [];
const gridHeight = inputRows.length;
const gridWidth = inputRows[0].length;

inputRows.forEach((row) => {
    grid.push(row.split('').map(Number));
});

let highestScenicScore = 0;

for (let y = 1; y < gridHeight - 1; ++y) {
    for (let x = 1; x < gridWidth - 1; ++x) {
        const origin = grid[y][x];

        const top = grid.slice(0, y).reverse();
        const blockedFromTop = top.findIndex((row) => row[x] >= origin);
        const topScenicScore = blockedFromTop === -1 ? top.length : blockedFromTop;

        const left = grid[y].slice(0, x).reverse();
        const blockedFromLeft = left.findIndex((height) => height >= origin);
        const leftScenicScore = blockedFromLeft === -1 ? left.length : blockedFromLeft;

        const bottom = grid.slice(y + 1);
        const blockedFromBottom = bottom.findIndex((row) => row[x] >= origin);
        const bottomScenicScore = blockedFromBottom === -1 ? bottom.length : blockedFromBottom + 1;

        const right = grid[y].slice(x + 1);
        const blockedFromRight = right.findIndex((height) => height >= origin);
        const rightScenicScore = blockedFromRight === -1 ? right.length : blockedFromRight + 1;

        const scenicScore = leftScenicScore * rightScenicScore * bottomScenicScore * topScenicScore;
        if (highestScenicScore < scenicScore) {
            highestScenicScore = scenicScore;
        }
    }
}

console.log('Answer:', highestScenicScore);
