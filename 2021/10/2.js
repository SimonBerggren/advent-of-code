const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n').map(row => row.split(''));

const closings = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
};

const openings = {
    '(': { char: ')', value: 1 },
    '[': { char: ']', value: 2 },
    '{': { char: '}', value: 3 },
    '<': { char: '>', value: 4 },
};

const scores = [];

rows.forEach(row => {
    const stack = [];
    let score = 0;

    row.forEach(paranthesis => {
        if (openings[paranthesis]) {
            stack.push(paranthesis);
        } else {
            const expected = closings[paranthesis];
            const reality = stack.pop();
            if (reality != expected) {
                score++;
            }
        }
    });

    if (!score) {
        stack.reverse().forEach(p => {
            score = score * 5 + openings[p].value;
        });
        scores.push(score);
    }
});

scores.sort((a, b) => a - b);
const score = scores[Math.floor(scores.length / 2)];

console.log(score);

