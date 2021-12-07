const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const crabs = input.split(',').map(Number);

const calculateFuelConsumption = (position) => {
    return crabs.reduce((totalCost, crabPosition) => {
        const range = Math.abs(position - crabPosition);
        let currentCost = 0;
        for (let i = 0; i < range; i++) {
            currentCost += 1 + i;
        }
        return totalCost + currentCost;
    }, 0);
}

let lowestFuelConsumption = Number.MAX_SAFE_INTEGER;
const maxPosition = crabs.reduce((p, c) => p > c ? p : c);

for (let i = 0; i <= maxPosition; i++) {
    const fuelConsumption = calculateFuelConsumption(i);
    if (fuelConsumption < lowestFuelConsumption) {
        lowestFuelConsumption = fuelConsumption;
    }
}

console.log(lowestFuelConsumption);