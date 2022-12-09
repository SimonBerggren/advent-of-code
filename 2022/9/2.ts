import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const visitedNodes = { '0.0': 1 };

const snake = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }));

inputRows.forEach((row, ri) => {
    const [direction, numberOfSteps] = row.split(' ');
    const steps = Number(numberOfSteps);

    for (let s = 0; s < steps; ++s) {
        if (direction === 'R') {
            ++snake[0].x;
        } else if (direction === 'U') {
            ++snake[0].y;
        } else if (direction === 'L') {
            --snake[0].x;
        } else if (direction === 'D') {
            --snake[0].y;
        }

        snake.forEach((part, index) => {
            if (index === 0) {
                return;
            }

            const previousPart = snake[index - 1];
            const diffX = previousPart.x - part.x;
            const distX = Math.abs(diffX);
            const normalizedDiffX = Math.min(1, Math.max(-1, diffX));

            const diffY = previousPart.y - part.y;
            const distY = Math.abs(diffY);
            const normalizedDiffY = Math.min(1, Math.max(-1, diffY));

            if (distX <= 1 && distY <= 1) {
                return;
            }

            if (
                (distX > 1 && previousPart.y !== part.y) ||
                (distY > 1 && previousPart.x !== part.x)
            ) {
                part.x += normalizedDiffX;
                part.y += normalizedDiffY;
            } else if (distX <= 1) {
                part.y += normalizedDiffY;
            } else if (distY <= 1) {
                part.x += normalizedDiffX;
            }

            if (index === snake.length - 1) {
                visitedNodes[`${part.x}.${part.y}`] = 1;
            }
        });
    }
});

const numberOfVisitedNodes = Object.keys(visitedNodes).length;

console.log('Answer:', numberOfVisitedNodes);
