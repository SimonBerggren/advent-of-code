import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n') as string[];

const shapes = {
    A: '🪨',
    X: 'lose',
    B: '📜',
    Y: 'draw',
    C: '✂',
    Z: 'win',
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

const getPoints = (opponent: string, expectedResult: string) => {
    if (opponent === '🪨') {
        if (expectedResult === 'win') {
            return points['📜'];
        }
        return points['✂'];
    } else if (opponent === '📜') {
        if (expectedResult === 'win') {
            return points['✂'];
        }
        return points['🪨'];
    }
    // opponent = ✂
    if (expectedResult === 'win') {
        return points['🪨'];
    }
    return points['📜'];
};

inputRows.forEach((row) => {
    const [opponentMove, expectedResultCode] = row.split(' ');
    const opponentShape = shapes[opponentMove];
    const expectedResult = shapes[expectedResultCode];
    const roundPoints = points[expectedResult];

    if (expectedResult === 'draw') {
        totalPoints += roundPoints + points[opponentShape];
    } else {
        totalPoints += roundPoints + getPoints(opponentShape, expectedResult);
    }
});

console.log('Answer:', totalPoints);
