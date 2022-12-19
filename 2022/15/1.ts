import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

let startX = Infinity;
let endX = -Infinity;

const sensors = [];

inputRows.forEach((row) => {
    const [sensorStr, beaconStr] = row.split(':');

    const [sensorX, sensorY] = sensorStr
        .slice(10)
        .split(',')
        .map((coord) => coord.split('=').pop())
        .map(Number);

    const [beaconX, beaconY] = beaconStr
        .slice(22)
        .split(',')
        .map((coord) => coord.split('=').pop())
        .map(Number);

    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    startX = Math.min(startX, sensorX - distance);

    endX = Math.max(endX, sensorX + distance);

    sensors.push({ x: sensorX, y: sensorY, bx: beaconX, by: beaconY, distance });
});

let impossibleSpaces = {};
const y = 2000000;
sensors.forEach((sensor) => {
    for (let x = startX; x <= endX; ++x) {
        const distance = Math.abs(sensor.x - x) + Math.abs(sensor.y - y);
        if (distance <= sensor.distance) {
            if (!(x === sensor.bx && y === sensor.by)) {
                impossibleSpaces[x] = 1;
            }
        }
    }
});

console.log('Answer:', Object.keys(impossibleSpaces).length);
