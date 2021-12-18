const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

let template = rows.shift().split('');

rows.shift();

const insertionRules = rows.map(row => row.split(' -> ').reduce((pair, result) => ({ [pair]: result }))).reduce((obj, values) => ({ ...obj, ...values }));

let originalMap = {};

template.forEach((char, index) => index < template.length - 1 && (originalMap[`${char}${template[index + 1]}`] = 1));

for (let step = 0; step < 40; step++) {
    let map = { ...originalMap };
    for (pair in map) {
        const insertChar = insertionRules[pair];

        if (insertChar) {
            const count = originalMap[pair];

            const newPairs = [pair[0] + insertChar, insertChar + pair[1]];

            newPairs.forEach(newPair => {
                if (!map[newPair]) {
                    map[newPair] = count;
                } else {
                    map[newPair] += count;
                }
            })
            map[pair] -= count;
            if (!map[pair]) {
                delete map[pair];
            }
        }
    }
    originalMap = map;
}

const charCount = {};

let first = true;
for (const pair in originalMap) {
    if (first) {
        pair.split('').forEach(char => {
            if (!charCount[char]) {
                charCount[char] = 0;
            }
            charCount[char] += originalMap[pair];
        })
        first = false;
        continue;
    }

    const char = pair.split('')[1];
    if (!charCount[char]) {
        charCount[char] = 0;
    }
    charCount[char] += originalMap[pair];
}

let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;

for (const char in charCount) {
    const count = charCount[char];
    if (count < min) {
        min = count;
    } else if (count > max) {
        max = count;
    }
}

console.log(max - min);