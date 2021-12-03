const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

const filterArray = (charIfEqual, multiplier) => {
    let array = [...instructions];
    for (let i = 0; i < 12; i++) {
        let current = 0;
        for (let j = 0; j < array.length; j++) {
            const binaryNumber = array[j];
            const b = binaryNumber[i];
            if (b === '0') {
                current -= 1 * multiplier;
            } else {
                current += 1 * multiplier;
            }
        }
        const char = current === 0 ? charIfEqual : current > 0 ? '1' : '0';
        array = array.filter(o => o[i] === char);

        if (array.length === 1) {
            return array[0];
        }
    }
}

console.log(parseInt(filterArray('1', 1), 2) * parseInt(filterArray('0', -1), 2));