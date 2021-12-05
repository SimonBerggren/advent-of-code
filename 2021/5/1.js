const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

let gridWidth = 0;
let gridHeight = 0;

const parseCoord = (coord) => {
    const split = coord.split(' -> ');
    const [x1, y1] = split[0].split(',').map(Number);
    const [x2, y2] = split[1].split(',').map(Number);

    gridWidth = Math.max(x1, x2, gridWidth);
    gridHeight = Math.max(y1, y2, gridHeight);

    return { x1, y1, x2, y2 };
}
const coords = instructions.map(parseCoord).filter(({ x1, x2, y1, y2 }) => x1 == x2 || y1 == y2);

const grid = new Array(gridHeight + 1).fill().map(() => new Array(gridWidth + 1).fill(0));

coords.forEach(({ x1, x2, y1, y2 }) => {
    const xDir = x1 == x2 ? 0 : x1 > x2 ? -1 : 1;
    const yDir = y1 == y2 ? 0 : y1 > y2 ? -1 : 1;

    for (let [x, y] = [x1, y1]; y != y2 + yDir || x != x2 + xDir;) {
        grid[y][x] += 1;
        x += xDir;
        y += yDir
    }
});

const nbrOfOverlaps = grid.reduce((count, row) => {
    return row.reduce((n1, n2) => n2 > 1 ? n1 + 1 : n1, count)
}, 0);

console.log(nbrOfOverlaps);
