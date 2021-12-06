const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const fish = input.split(',');

const school = new Array(9).fill(0);

fish.forEach(f => {
    school[f] += 1;
});

for (let day = 0; day < 80; day++) {
    let fish;
    for (let i = 8; i >= 0; i--) {
        if (i === 0) {
            school[6] += school[i];
            school[8] = school[i];
            school[i] = fish;
        } else if (i === 8) {
            fish = school[i];
        } else {
            let oldFish = school[i];
            school[i] = fish;
            fish = oldFish;
        }
    }
}

console.log(school.reduce((p, c) => p + c));