const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const widthIndex = input.search(/-?[0-9]+..-?[0-9]+/);

const [widthString] = /-?[0-9]+..-?[0-9]+/.exec(input);
const heightString = /-?[0-9]+..-?[0-9]+/.exec(input.slice(widthIndex + widthString.length))[0];

const [startX, endX] = widthString.split('..').map(Number);
const [startY, endY] = heightString.split('..').map(Number);

const isInGoal = ([x, y]) => x >= startX && x <= endX && y >= startY && y <= endY;

let highestPoint = Number.MIN_SAFE_INTEGER;

for (let startXVel = 1; startXVel < 1000; startXVel++) {
    for (let startYVel = 1; startYVel < 1000; startYVel++) {

        let xVel = startXVel;
        let yVel = startYVel;
        let currentPos = [0, 0];

        let currentHighest = 0;
        while (xVel != 0 || currentPos[1] > endY) {

            let [x, y] = currentPos;
            currentPos = [x + xVel, y + yVel];
            if (isInGoal(currentPos)) {
                if (highestPoint < currentHighest) {
                    highestPoint = currentHighest;
                }
                break;
            }

            if (yVel == 0) {
                currentHighest = currentPos[1];
            }

            if (xVel < 0) {
                xVel += 1;
            } else if (xVel > 0) {
                xVel -= 1;
            }

            yVel -= 1;
        }

    }
}
console.log(highestPoint);