const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split('\n').map(r => Number(r));

const readNrOfIncreasedDepth = (array) => {
    let nrIncreasedTimes = 0;
    array.reduce((prev, curr) => {
        if (curr > prev) {
            ++nrIncreasedTimes;
        }
        return curr;
    }, Number.MAX_SAFE_INTEGER);
    return nrIncreasedTimes;
}

const aggregatedInputRows = inputRows.map((row, index) => {
    if (index <= inputRows.length - 3) {
        return row + inputRows[index + 1] + inputRows[index + 2];
    }
}).filter(r => r !== undefined);

console.log(readNrOfIncreasedDepth(inputRows));