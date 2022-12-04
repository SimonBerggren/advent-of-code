const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const rows = fs.readFileSync(inputPath).toString().split('\n');

const ranges = {
}

let curr = 0;

const getRange = (key) => key.split(',').map(Number);

rows.forEach(row => {
    if (++curr > 2) {
        return;
    }

    let [instruction, positions] = row.split(' ');
    const cubeStatus = instruction == 'on' ? 1 : 0;

    positions = positions.split(',').map(position => {
        return position.slice(2).split('..').map(Number);
    });

    const [newXMin, newXMax] = positions[0];
    const [newYMin, newYMax] = positions[1];
    const [newZMin, newZMax] = positions[2];

    if (Object.keys(ranges).length == 0) {
        ranges[`${newXMin},${newXMax}`] = {
            [`${newYMin},${newYMax}`]: `${newZMin},${newZMax}`
        };
        return;
    }

    if (cubeStatus == 1) {
        for (const xRange in ranges) {
            const [xMin, xMax] = getRange(xRange);

            if (xMin > newXMax || xMax < newXMin) { // create new entry

                ranges[`${newXMin},${newXMax}`] = {
                    [`${newYMin},${newYMax}`]: `${newZMin},${newZMax}`
                };
                continue;

            } else if (xMin <= newXMin && xMax >= newXMax) { // use same entry
                console.log('same entry');
            } else if (xMin <= newXMin && xMax <= newXMax) { // partially overlapping
                console.log('overlapping here');
            } else if (xMin >= newXMin && xMax >= newXMax) { // partially overlapping
                console.log('overlapping', newXMin, newXMax);
                ranges[`${xMin},${newXMax}`]
            } else {

                console.log('none');
            }

            // for (const xRange in ranges[yRange]) {
            //     const zRange = ranges[yRange][xRange];
            // }
        }
    } else {

    }


});

console.log(ranges);