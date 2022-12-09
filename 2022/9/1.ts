import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0, visitedNodes: { '0.0': 1 } };

inputRows.forEach((row) => {
    const [direction, numberOfSteps] = row.split(' ');
    const steps = Number(numberOfSteps);

    for (let s = 0; s < steps; ++s) {
        if (direction === 'R') {
            ++head.x;
        } else if (direction === 'U') {
            ++head.y;
        } else if (direction === 'L') {
            --head.x;
        } else if (direction === 'D') {
            --head.y;
        }

        const diffX = head.x - tail.x;
        const distX = Math.abs(diffX);
        const normalizedDiffX = Math.min(1, Math.max(-1, diffX));

        const diffY = head.y - tail.y;
        const distY = Math.abs(diffY);
        const normalizedDiffY = Math.min(1, Math.max(-1, diffY));

        if (distX <= 1 && distY <= 1) {
            continue;
        }

        if ((distX > 1 && head.y !== tail.y) || (distY > 1 && head.x !== tail.x)) {
            tail.x += normalizedDiffX;
            tail.y += normalizedDiffY;
        } else if (distX <= 1) {
            tail.y += normalizedDiffY;
        } else if (distY <= 1) {
            tail.x += normalizedDiffX;
        }

        tail.visitedNodes[`${tail.x}.${tail.y}`] = 1;
    }
});

const visitedNodes = Object.keys(tail.visitedNodes).length;

console.log('Answer:', visitedNodes);
