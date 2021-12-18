const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

const breakIndex = rows.indexOf('');

const dotCoords = rows.splice(0, breakIndex).map(coord => coord.split(',').map(Number));

const width = Math.max(...dotCoords.map(coord => coord[0])) + 1;
const height = Math.max(...dotCoords.map(coord => coord[1])) + 1;

const grid = new Array(height).fill(0).map(() => new Array(width).fill(0));

rows.shift();

const folds = rows.splice(0).map(fold => fold.substring(11).split('=').reduce((axis, value) => [axis, Number(value)]));

dotCoords.forEach(coord => {
    const [x, y] = coord;
    grid[y][x] = 1;
});

const transponeMatrix = (matrix) => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

const fold = (axis, value, paper) => {
    if (axis === 'x') {
        paper = transponeMatrix(paper);
    }
    const left = paper.splice(0, value);
    const right = paper.reverse();
    let result = left.map((row, y) => {
        return row.map((v, i) => {
            return v ? v : v + right[y][i];
        });
    });
    if (axis === 'x') {
        result = transponeMatrix(result);
    }
    return result;
}

let result = grid;

while (folds.length) {
    const [axis, value] = folds.shift();
    result = fold(axis, value, result);
}

console.log(result.map(row => row.map(l => l ? '██' : '  ').join('')).join('\n'));