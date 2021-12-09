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

        lowPoints.push({ x, y });
    });
});

const basins = [];

lowPoints.forEach((lowPoint) => {
    const basin = [lowPoint];

    const findPoint = ({ x: sx, y: sy }) => ({ x: ex, y: ey }) => sx == ex && sy == ey;

    const searchHorizontal = (searchPoint) => {
        let x = searchPoint.x;
        let y = searchPoint.y;
        while (x >= 0) {
            if (rows[y][x] == 9) break;
            const point = { x, y };
            if (!basin.find(findPoint(point))) {
                basin.push(point);
                searchVertical(point, true);
            }
            --x;
        }

        x = searchPoint.x;
        while (x < width) {
            if (rows[y][x] == 9) break;
            const point = { x, y };
            if (!basin.find(findPoint(point))) {
                basin.push(point);
                searchVertical(point, true);
            }
            ++x;
        }
    }

    const searchVertical = (searchPoint) => {
        let x = searchPoint.x;
        let y = searchPoint.y;
        while (y >= 0) {
            if (rows[y][x] == 9) break;
            const point = { x, y };
            if (!basin.find(findPoint(point))) {
                basin.push(point);
                searchHorizontal(point, true);
            }
            --y;
        }

        y = searchPoint.y;
        while (y < height) {
            if (rows[y][x] == 9) break;
            const point = { x, y };
            if (!basin.find(findPoint(point))) {
                basin.push(point);
                searchHorizontal(point, true);
            }
            ++y;
        }
    }

    searchHorizontal(lowPoint);
    searchVertical(lowPoint);

    basins.push(basin.length);

});

const sum = basins.sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p * c);

console.log(sum);