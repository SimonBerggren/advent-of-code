import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

// remove root
const root = { name: '', children: [], parent: undefined };
let currentNode = root;

for (let i = 1; i < inputRows.length - 1; ++i) {
    const row = inputRows[i];
    const parts = row.split(' ');

    if (parts[0] === '$') {
        const [, command, dirName] = parts;
        if (command === 'cd') {
            if (dirName === '..') {
                currentNode = currentNode.parent;
            } else {
                currentNode = currentNode.children.find((c) => c.name === dirName);
            }
        } else if (command === 'ls') {
            let next = i + 1;
            while (next < inputRows.length - 1) {
                const nextRow = inputRows[next];
                if (nextRow.startsWith('$')) {
                    i = next - 1;
                    break;
                }
                ++next;

                const [dirOrSize, name] = nextRow.split(' ');
                const isDir = dirOrSize === 'dir';

                currentNode.children.push({
                    name: name,
                    children: isDir ? [] : undefined,
                    parent: currentNode,
                    size: isDir ? undefined : Number(dirOrSize),
                });
            }
        }
    }
}

const dirSizes = [];

const getDirSize = (dir) => {
    let dirSize = 0;
    dir.children.forEach((child) => {
        if (child.children) {
            const childSize = getDirSize(child);
            dirSize += childSize;
        } else {
            dirSize += child.size;
        }
    });

    dirSizes.push(dirSize);

    return dirSize;
};

const maxSpace = 70000000;
const updateSize = 30000000;
const totalSize = getDirSize(root);
const freeSpace = maxSpace - totalSize;
const spaceNeeded = updateSize - freeSpace;

dirSizes.sort((a, b) => a - b);

const smallestDirSize = dirSizes.find((s) => s >= spaceNeeded);

console.log('Answer:', smallestDirSize);
