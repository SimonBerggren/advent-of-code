import { readFileSync } from 'fs';
import { resolve } from 'path';

type GridNode = {
    coord: string;
};

type GridNodeMap = { [key: string]: GridNode };

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let start: GridNode;
let end: GridNode;

const grid = input.split('\n').map((row, y) =>
    row.split('').map((char, x) => {
        if (char === 'S') {
            start = { coord: `${x}.${y}` };
            return alphabet.indexOf('a');
        } else if (char === 'E') {
            end = { coord: `${x}.${y}` };
            return alphabet.indexOf('z');
        }
        return alphabet.indexOf(char);
    })
);

const reconstructPath = (cameFrom: GridNodeMap, node: GridNode) => {
    const path = [node];
    let current = { ...node };
    while (Object.keys(cameFrom).includes(current.coord)) {
        current = cameFrom[current.coord];
        path.unshift(current);
    }
    return path;
};

const heuristic = (node: GridNode, goal: GridNode) => {
    const [nX, nY] = node.coord.split('.').map(Number);
    const [gX, gY] = goal.coord.split('.').map(Number);

    return Math.abs(nX - gX) + Math.abs(nY - gY);
};

const run = (start: GridNode, goal: GridNode) => {
    const openSet: GridNode[] = [start];

    const cameFrom: GridNodeMap = {};

    const gScore = { [start.coord]: 0 };

    const fScore = { [start.coord]: heuristic(start, goal) };

    while (openSet.length > 0) {
        const sortedFScore = openSet.sort((a, b) => fScore[a.coord] - fScore[b.coord]);

        let current = sortedFScore.shift();

        if (current.coord === goal.coord) {
            return reconstructPath(cameFrom, current);
        }

        const [x, y] = current.coord.split('.').map(Number);
        const neighbors: GridNode[] = [];

        if (x > 0) {
            const [nX, nY] = [x - 1, y];
            if (grid[nY][nX] <= grid[y][x] || Math.abs(grid[nY][nX] - grid[y][x]) === 1) {
                const coord = `${nX}.${nY}`;
                if (!openSet.some((node) => node.coord === coord)) {
                    neighbors.push({ coord });
                }
            }
        }

        if (y > 0) {
            const [nX, nY] = [x, y - 1];
            if (grid[nY][nX] <= grid[y][x] || Math.abs(grid[nY][nX] - grid[y][x]) === 1) {
                const coord = `${nX}.${nY}`;
                if (!openSet.some((node) => node.coord === coord)) {
                    neighbors.push({ coord });
                }
            }
        }

        if (x < inputRows[0].length - 1) {
            const [nX, nY] = [x + 1, y];
            if (grid[nY][nX] <= grid[y][x] || Math.abs(grid[nY][nX] - grid[y][x]) === 1) {
                const coord = `${nX}.${nY}`;
                if (!openSet.some((node) => node.coord === coord)) {
                    neighbors.push({ coord });
                }
            }
        }

        if (y < inputRows.length - 1) {
            const [nX, nY] = [x, y + 1];

            if (grid[nY][nX] <= grid[y][x] || Math.abs(grid[nY][nX] - grid[y][x]) === 1) {
                const coord = `${nX}.${nY}`;
                if (!openSet.some((node) => node.coord === coord)) {
                    neighbors.push({ coord });
                }
            }
        }

        for (const neighbor of neighbors) {
            const score = gScore[current.coord] + 1;
            if (gScore[neighbor.coord] === undefined || score < gScore[neighbor.coord]) {
                cameFrom[neighbor.coord] = current;
                gScore[neighbor.coord] = score;
                fScore[neighbor.coord] = score + heuristic(neighbor, goal);
                if (!openSet.some((node) => node.coord === neighbor.coord)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return [];
};

const answer = run(start, end);
console.log(answer.length - 1);
