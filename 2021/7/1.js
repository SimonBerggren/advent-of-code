const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const crabs = input.split(',').map(Number);

const calculateFuelConsumption = (position) => {
    return crabs.reduce((totalCost, crabPosition) => {
        return totalCost + Math.abs(position - crabPosition)
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