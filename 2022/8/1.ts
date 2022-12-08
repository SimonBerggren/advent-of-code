import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

type Node = { height: number; visible: boolean };
const grid: Node[][] = [];
const gridHeight = inputRows.length;
const gridWidth = inputRows[0].length;

inputRows.forEach((row, y) => {
    grid.push(
        row.split('').map((cell, x) => ({
            height: Number(cell),
            visible: x === 0 || y === 0 || x === gridWidth - 1 || y === gridHeight - 1,
        }))
    );
});

let visibleTrees = gridHeight * 2 + gridWidth * 2 - 4;

for (let y = 1; y < gridHeight - 1; ++y) {
    for (let x = 1; x < gridWidth - 1; ++x) {
        const origin = grid[y][x];

        if (origin.visible) {
            continue;
        }

        const wayFromLeft = grid[y].slice(0, x).every(({ height }) => height < origin.height);

        if (wayFromLeft) {
            origin.visible = true;
            ++visibleTrees;
            continue;
        }

        const wayFromRight = grid[y].slice(x + 1).every(({ height }) => height < origin.height);

        if (wayFromRight) {
            origin.visible = true;
            ++visibleTrees;
            continue;
        }

        const wayFromTop = grid.slice(0, y).every((row) => row[x].height < origin.height);

        if (wayFromTop) {
            origin.visible = true;
            ++visibleTrees;
            continue;
        }

        const wayFromBottom = grid.slice(y + 1).every((row) => row[x].height < origin.height);

        if (wayFromBottom) {
            origin.visible = true;
            ++visibleTrees;
            continue;
        }
    }
}

console.log('Answer:', visibleTrees);
