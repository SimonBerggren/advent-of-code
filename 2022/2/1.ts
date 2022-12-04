import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

const shapes = {
    A: '🪨',
    X: '🪨',
    B: '📜',
    Y: '📜',
    C: '✂',
    Z: '✂',
};

const points = {
    '🪨': 1,
    '📜': 2,
    '✂': 3,
    lose: 0,
    draw: 3,
    win: 6,
};

let totalPoints = 0;

const getPoints = (opponent: string, player: string) => {
    if (opponent === '🪨') {
        if (player === '📜') {
            return points.win;
        }
        return points.lose;
    } else if (opponent === '📜') {
        if (player === '🪨') {
            return points.lose;
        }
        return points.win;
    }
    // opponent = ✂
    if (player === '🪨') {
        return points.win;
    }
    return points.lose;
};

inputRows.forEach((row) => {
    if (!row) {
        return;
    }

    const [opponentMove, playerMove] = row.split(' ');

    const opponentShape = shapes[opponentMove];
    const playerShape = shapes[playerMove];
    const shapePoints = points[playerShape];

    if (opponentShape === playerShape) {
        totalPoints += shapePoints + points.draw;
    } else {
        totalPoints += shapePoints + getPoints(opponentShape, playerShape);
    }
});

console.log('Answer:', totalPoints);
