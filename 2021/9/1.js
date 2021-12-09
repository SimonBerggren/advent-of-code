const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n').map(row => row.split('').map(Number));

const height = rows.length;
const width = rows[0].length;

const lowPoints = [];

rows.forEach((row, y) => {
    row.forEach((col, x) => {
        if (y > 0 && rows[y - 1][x] <= col) return;

        if (y < height - 1 && rows[y + 1][x] <= col) return;

        if (x > 0 && rows[y][x - 1] <= col) return;

        if (x < width - 1 && rows[y][x + 1] <= col) return;

        lowPoints.push(col + 1);
    });
});

const sum = lowPoints.reduce((c, p) => c + p);

console.log(sum);