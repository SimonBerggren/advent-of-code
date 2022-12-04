const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const rows = fs.readFileSync(inputPath).toString().split('\n');

const player1 = {
    position: Number(rows[0][rows[0].length - 1]),
    score: 0,
    id: 1
};

const player2 = {
    position: Number(rows[1][rows[1].length - 1]),
    score: 0,
    id: 2
};

let numberOfDieRolls = 0;
let currentDie = 0;
const getNextDieResult = () => {
    if (++currentDie > 100) {
        currentDie = 1;
    }
    ++numberOfDieRolls;
    return currentDie;
}

let currentPlayer = player1;
while (player1.score < 1000 && player2.score < 1000) {
    const numberOfSteps = getNextDieResult() + getNextDieResult() + getNextDieResult();
    currentPlayer.score += currentPlayer.position = ((currentPlayer.position + numberOfSteps)) % 10 || 10;
    currentPlayer = currentPlayer.id == 1 ? player2 : player1;
}

const sum = numberOfDieRolls * currentPlayer.score;

console.log(sum);