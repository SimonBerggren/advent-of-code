const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const grid = input.split('\n').map(row => row.split('').map(Number));

const flashPositions = [];

const doFlash = (x, y) => {
    if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        if (++grid[y][x] == 10) {
            flashPositions.push({ x, y });
        }
    }
}

const flashNearby = ({ x, y }) => {
    doFlash(x - 1, y);
    doFlash(x + 1, y);
    doFlash(x, y - 1);
    doFlash(x, y + 1);
    doFlash(x + 1, y + 1);
    doFlash(x - 1, y - 1);
    doFlash(x - 1, y + 1);
    doFlash(x + 1, y - 1);
}

const isAllZero = () => {
    for (const y in grid) {
        const row = grid[y];
        for (const x in row) {
            if (row[x] != 0) {
                return false;
            }
        }
    }
    return true;
}

let step = 0;
let complete = false;

while (!complete) {

    for (const y in grid) {
        const row = grid[y];
        for (const x in row) {
            if (++row[x] == 10) {
                flashPositions.push({ x: Number(x), y: Number(y) });
            }
        }
    }

    while (flashPositions.length) {
        flashNearby(flashPositions.shift());
    }

    for (const y in grid) {
        const row = grid[y];
        for (const x in row) {
            if (row[x] > 9) {
                row[x] = 0;
            }
        }
    }

    ++step;

    complete = isAllZero();
}

console.log(step);