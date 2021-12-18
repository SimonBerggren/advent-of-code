const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const set = {};
const grid = input.split('\n').map((row, y) => row.split('').map((num, x) => ({ cost: Infinity, weight: Number(num), visited: false, x, y })));

grid.forEach(row => {
    row.forEach(node => {
        set[`${node.x}-${node.y}`] = node;
    });
});

const height = grid.length;
const width = grid[0].length;

const findPath = () => {

    let currentNode = set[`${0}-${0}`];
    currentNode.cost = 0;

    while (true) {
        const { x, y } = currentNode;
        delete set[`${x}-${y}`];

        [
            set[`${x - 1}-${y}`],
            set[`${x + 1}-${y}`],
            set[`${x}-${y - 1}`],
            set[`${x}-${y + 1}`],
        ]
            .filter(coord => coord && !coord.visited)
            .forEach(neighbor => {
                const newCost = neighbor.weight + currentNode.cost;
                if (newCost < neighbor.cost) {
                    neighbor.cost = newCost;
                }
            })

        currentNode.visited = true;

        if (x == width - 1 && y == height - 1) {
            return currentNode;
        }

        let next = { cost: Infinity };
        for (const key in set) {
            const obj = set[key];
            if (obj.cost < next.cost) {
                next = obj;
            }
        }

        currentNode = next;
    }
}

console.log(findPath());