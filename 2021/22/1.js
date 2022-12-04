const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const rows = fs.readFileSync(inputPath).toString().split('\n');

const boundaries = [-50, 50];

const cubes =
    new Array(101).fill().map(
        () => new Array(101).fill().map(
            () => new Array(101).fill(0)
        )
    );

rows.forEach(row => {
    let [instruction, positions] = row.split(' ');
    const cubeStatus = instruction == 'on' ? 1 : 0;

    positions = positions.split(',').map(position => {
        return position.slice(2).split('..').map(p => Number(p) + 50);
    }).filter(([from, to]) => from >= 0 && 100 >= from && to >= 0 && 100 >= to);


    if (positions.length != 3) {
        return;
    }

    const xRange = positions[0];
    const yRange = positions[1];
    const zRange = positions[2];

    cubes.forEach((row, y) => {
        row.forEach((col, x) => {
            col.forEach((_, z) => {
                if (yRange[0] <= y && y <= yRange[1]) {
                    if (xRange[0] <= x && x <= xRange[1]) {
                        if (zRange[0] <= z && z <= zRange[1]) {
                            cubes[y][x][z] = cubeStatus;
                        }
                    }
                }
            })
        })
    });
});

let count =
    cubes.reduce((rowCount, row) =>
        rowCount + row.reduce((colCount, col) =>
            colCount + col.reduce((cubeCount, cube) =>
                cubeCount + cube
                , 0)
            , 0)
        , 0)

console.log(count);