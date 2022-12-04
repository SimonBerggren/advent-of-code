const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n');

const algorithm = rows.shift();
rows.shift();

let background = '.';

const enlargeImage = (image) => {
    const copy = image.map(col => [background, ...col, background]);
    copy.push(new Array(copy[0].length).fill(background));
    copy.unshift(new Array(copy[0].length).fill(background));

    return copy;
}

const copyImage = (image) => {
    return image.map(col => [...col]);
}

const original = rows.map(col => col.split(''));
let copy = enlargeImage(original);

const getSurroundingPixels = (x, y, image) => {
    return [
        image[y - 1]?.[x - 1], image[y - 1]?.[x], image[y - 1]?.[x + 1],
        image[y]?.[x - 1], image[y]?.[x], image[y]?.[x + 1],
        image[y + 1]?.[x - 1], image[y + 1]?.[x], image[y + 1]?.[x + 1],
    ].map(pixel => pixel ? (pixel == '#' ? 1 : 0) : background == '#' ? 1 : 0).join('');
}

for (let step = 0; step < 2; step++) {
    let enhancedImage = copyImage(copy);
    for (let y = 0; y < copy.length; y++) {
        for (let x = 0; x < copy[y].length; x++) {
            const surroundingPixels = getSurroundingPixels(x, y, copy);
            const index = parseInt(surroundingPixels, 2);
            const resultingPixel = algorithm[index];
            enhancedImage[y][x] = resultingPixel;
        }
    }
    background = background == '.' ? '#' : '.';
    copy = enlargeImage(enhancedImage);
}

const lit = copy.flat(Infinity).reduce((sum, pixel) => pixel == '#' ? sum + 1 : sum, 0);
console.log(lit);
