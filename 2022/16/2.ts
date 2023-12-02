import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

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

    sensors.push({ sensorX, sensorY, distance });
});

const min = 0;
const max = 4000000;

let perfectSpot;

const ranges = [];

sensors.forEach(({ sensorX, sensorY, distance }, sensorIndex) => {
    const arr = [];

    const outside = distance + 1;

    for (let i = 0; i <= outside; ++i) {
        const minX = sensorX - (outside - i);
        const minY = sensorY - i;
        const maxX = sensorX + (outside - i);
        const maxY = sensorY + i;

        const coords = [
            { x: minX, y: minY },
            { x: minX, y: maxY },
            { x: maxX, y: minY },
            { x: maxX, y: maxY },
        ].filter(({ x, y }) => x >= min && x <= max && y >= min && y <= max);

        coords.forEach(({ x, y }) => {
            if (perfectSpot) {
                return;
            }
            if (
                sensors.every(({ sensorX: sx, sensorY: sy, distance: sd }, si) => {
                    if (sensorIndex === si) {
                        return true;
                    }

                    const dist = Math.abs(x - sx) + Math.abs(y - sy);
                    return dist > sd;
                })
            ) {
                perfectSpot = { x, y };
            }
        });

        if (perfectSpot) {
            break;
        }
    }
    ranges.push(arr);
});

console.log(perfectSpot.x * 4000000 + perfectSpot.y);
