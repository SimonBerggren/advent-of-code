const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

let template = rows.shift().split('');

const charCount = {};

rows.shift();

const insertionRules = rows.map(row => row.split(' -> ').reduce((pair, result) => ({ [pair]: result }))).reduce((obj, values) => ({ ...obj, ...values }));

for (let step = 0; step < 10; step++) {
    template = template.reduce((array, char, index) => {
        const insertion = insertionRules[`${char}${template[index + 1]}`];

        if (insertion) {
            return array.concat(char, insertion);
        }
        return array.concat(char);
    }, []);
}

template.forEach(char => {
    if (!charCount[char]) {
        charCount[char] = 0;
    }
    charCount[char] += 1;
})

let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;

for (const char in charCount) {
    const count = template.filter(c => c === char).length;
    if (count < min) {
        min = count;
    } else if (count > max) {
        max = count;
    }
}

console.log(max - min);