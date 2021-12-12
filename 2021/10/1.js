const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n').map(row => row.split(''));

const map = {
    ')': { char: '(', value: 3 },
    ']': { char: '[', value: 57 },
    '}': { char: '{', value: 1197 },
    '>': { char: '<', value: 25137 },
};

const stack = [];
let score = 0;

rows.forEach(row => {
    let rowScore = 0;
    row.forEach(paranthesis => {
        const expected = map[paranthesis];

        if (!expected) {
            stack.push(paranthesis);
            return;
        }

        const reality = stack.pop();
        if (reality != expected.char) {
            rowScore += expected.value;
        }
    });

    score += rowScore;
    stack.splice(0);
});

console.log(score);