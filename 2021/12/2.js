const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

const network = {};

class Cave {
    caves;
    isSmallCave;
    id;

    constructor(id) {
        this.id = id;
        this.caves = [];
        this.isSmallCave = id.toLowerCase() === id;
    }

    addCave(cave) {
        this.caves.push(cave);
    }

    visitCaves(path = '', visitedSmallCave) {
        if (this.isSmallCave && path.includes(this.id)) {
            if (visitedSmallCave) {
                return undefined;
            }
            visitedSmallCave = true;
        }

        path += `,${this.id}`;

        if (!this.caves.length) {
            return path;
        }

        return this.caves.map(c => c.visitCaves(path, visitedSmallCave));
    }
}

rows.forEach(row => {
    const [a, b] = row.split('-');

    if (!network[a]) {
        network[a] = new Cave(a);
    }

    if (!network[b]) {
        network[b] = new Cave(b);
    }

    if (b !== 'start' && a !== 'end') {
        network[a].addCave(network[b]);
    }

    if (a !== 'start' && b !== 'end') {
        network[b].addCave(network[a]);
    }
});

const start = network['start'];

const visitedPaths = start.visitCaves();

const legitPaths = visitedPaths.flat(Infinity).filter(path => !!path);

console.log(legitPaths.length);