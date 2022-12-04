const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

const algorithm = rows.shift();
rows.shift();

let background = '.';

const enlargeImage = (image) => {
    return [
        new Array(image[0].length + 2).fill(background),
        ...image.map(col => [background, ...col, background]),
        new Array(image[0].length + 2).fill(background),
    ];
}

let copy = rows.map(col => col.split(''));

const getSurroundingPixels = (x, y, image) => {
    return [
        image[y - 1]?.[x - 1], image[y - 1]?.[x], image[y - 1]?.[x + 1],
        image[y]?.[x - 1], image[y]?.[x], image[y]?.[x + 1],
        image[y + 1]?.[x - 1], image[y + 1]?.[x], image[y + 1]?.[x + 1],
    ].map(pixel => (pixel || background) == '#' ? 1 : 0).join('');
}

for (let step = 0; step < 50; step++) {
    copy = enlargeImage(copy);
    copy = copy.map((row, y) => {
        return row.map((_, x) => {
            const surroundingPixels = getSurroundingPixels(x, y, copy);
            const index = parseInt(surroundingPixels, 2);
            return algorithm[index];
        });
    });
    background = background == '.' ? '#' : '.';
}

const lit = copy.flat(Infinity).reduce((sum, pixel) => pixel == '#' ? sum + 1 : sum, 0);
console.log(lit);
