const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const originalGrid = input.split('\n').map(row => row.split('').map(num => Number(num)));

const originalSize = originalGrid.length;
const expandedSize = originalSize * 5;

let grid = new Array(expandedSize).fill(0).map((_, y) => new Array(expandedSize).fill(0));

for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        originalGrid.forEach((row, nodeY) => {
            row.forEach((weight, nodeX) => {
                const newX = nodeX + originalSize * x;
                const newY = nodeY + originalSize * y;
                const newWeight = ((weight + x + y) % 10 + Math.floor((weight + x + y) / 10)) || 1;
                grid[newY][newX] = {
                    weight: newWeight,
                    cost: Infinity,
                }
            });
        });
    }
}

grid.forEach((row, y) => {
    row.forEach((node, x) => {
        node.neighbors = [
            x > 0 && grid[y][x - 1],
            x < expandedSize - 1 && grid[y][x + 1],
            y > 0 && grid[y - 1][x],
            y < expandedSize - 1 && grid[y + 1][x],
        ].filter(neighbor => !!neighbor);
    });
});

const start = grid[0][0];
start.cost = 0;
const end = grid[expandedSize - 1][expandedSize - 1];

const queue = new Set();
queue.add(start);

const setCost = (from, to) => {
    const newCost = from.cost + to.weight;
    if (newCost < to.cost) {
        to.cost = newCost;
    }
}

const nextNode = () => {
    let next;
    for (const node of queue) {
        if (!next || node.cost < next.cost) {
            next = node;
        }
    }
    return next;
}

while (true) {
    const node = nextNode();

    node.neighbors
        .filter(n => !n.visited)
        .forEach(neighbor => {
            setCost(node, neighbor);
            queue.add(neighbor);
        });

    if (node == end) {
        break;
    }

    node.visited = true;

    queue.delete(node);
}

console.log(end.cost);