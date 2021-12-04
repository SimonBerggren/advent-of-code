const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();
const instructions = input.split('\n');

const moves = instructions.shift().split(',');
instructions.shift();

const boards = [];

const buildBoards = () => {
    boards.push([]);
    const boardnr = boards.length - 1;

    for (let y = 0; y < 5; ++y) {
        const row = instructions.shift();
        boards[boardnr].push([]);
        const cols = row.split(' ').filter(c => !!c);
        for (let x = 0; x < 5; ++x) {
            boards[boardnr][y].push(cols[x])
        }
    }

    instructions.shift();
    if (instructions.length) {
        buildBoards();
    }
}

const solution = () => {
    for (let m = 0; m < moves.length; m++) {
        const move = moves[m];
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (board[y][x] === move) {
                        board[y][x] = `m${board[y][x]}`;
                    }
                }

            }
        }

        if (m >= 5) {
            const winningBoardIndex = lookForSolutions();
            if (winningBoardIndex.length) {
                let deletedBoards = 0;
                for (let i = 0; i < winningBoardIndex.length; i++) {
                    const winningIndex = winningBoardIndex[i] - deletedBoards;
                    if (boards.length === 1) {
                        const sum = calculateSum(boards[winningIndex]);
                        return sum * move;
                    }
                    boards.splice(winningIndex, 1);
                    deletedBoards++;
                }
            }
        }
    }
}

const checkBoard = (board, horizontal) => {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (horizontal) {
                if (!board[y][x].startsWith('m')) {
                    break;
                }
            } else {
                if (!board[x][y].startsWith('m')) {
                    break;
                }
            }

            if (x === 4) {
                return true;
            }
        }
    }
    return false;
}

const lookForSolutions = () => {
    const solutions = [];
    for (let i = 0; i < boards.length; i++) {
        if (checkBoard(boards[i], true) || checkBoard(boards[i], false)) {
            solutions.push(i)
        }
    }
    return solutions;
}

const calculateSum = (winningBoard) => {
    let sum = 0;
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (!winningBoard[y][x].startsWith('m')) {
                sum += Number(winningBoard[y][x]);
            }
        }
    }
    return sum;
}

buildBoards();
console.log(solution());