const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const rows = fs.readFileSync(inputPath).toString().split('\n');

const player1Start = Number(rows[0][rows[0].length - 1]);
const player2Start = Number(rows[1][rows[1].length - 1]);

const wins = [0, 0];

const rolls = new Map([
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1],
]);

const rollDice = (player, roll, count, state) => {
    state[player + 2] += state[player] = (state[player] + roll) % 10 || 10;
    if (state[player + 2] >= 21) {
        wins[player] += count;
    } else {
        for (const [nextRoll, nextCount] of rolls) {
            rollDice(player == 1 ? 0 : 1, nextRoll, count * nextCount, [...state]);
        }
    }
}

for (const [roll, count] of rolls) {
    rollDice(0, roll, count, [player1Start, player2Start, 0, 0])
}

const mostWins = Math.max(...wins);

console.log(mostWins);