import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const grid = {};
const flowRates: string[] = [];

inputRows.forEach((row) => {
    const [p1, p2] = row.split(';');
    const splitRow = p1.split(' ');
    const id = splitRow[1];
    const flowRate = splitRow[4].match(/\d+/g).map(Number).pop();
    const connections = p2.split(', ');
    connections[0] = connections[0].slice(-2);

    flowRates.push(id);

    grid[id] = { flowRate, connections };
});

const calculateNextMove = (
    currentValve: string,
    valveToSearchFor: string,
    numberOfSteps = 0,
    foundValues: string[] = [],
    ppm = 0,
    pressure = 0,
    minute = 0
) => {
    if (minute >= 30) {
        return { id: currentValve, numberOfSteps, pressure: pressure + ppm, ppm, minute };
    }

    if (currentValve === valveToSearchFor) {
        return {
            id: currentValve,
            numberOfSteps,
            pressure: pressure + ppm,
            ppm: ppm + grid[currentValve].flowRate,
            minute: minute + 1,
        };
    }

    const path = grid[currentValve].connections
        .filter((otherValve) => !foundValues.includes(otherValve))
        .map((otherValve) =>
            calculateNextMove(
                otherValve,
                valveToSearchFor,
                numberOfSteps + 1,
                foundValues.concat(currentValve),
                ppm,
                pressure + ppm,
                minute + 1
            )
        )
        .filter((answer) => !!answer)
        .flat();

    path.sort((a, b) => a.numberOfSteps - b.numberOfSteps);

    return path[0];
};

const findCost = (path: string[]) => {
    const cost = path.reduce(
        (acc, valve) => {
            const answer = calculateNextMove(
                acc.id,
                valve,
                0,
                [],
                acc.ppm,
                acc.pressure,
                acc.minute
            );

            return answer;
        },
        { id: 'AA', ppm: 0, pressure: 0, minute: 0 }
    );

    return cost;
};

const base = flowRates.filter((id) => grid[id].flowRate > 0);
const results = [];

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1,
        k,
        p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;

            // const totalCost = findCost(permutation.slice());
            // totalCost.pressure += totalCost.ppm * (30 - totalCost.minute);
            // results.push(totalCost.pressure);

            console.log(results.push(1));

            // console.log(Math.pow(base.length - 1, base.length - 2), results.length);

            // result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

// console.log(base.length);

permute(base);

// const costs = paths.map((path, i) => {
//     console.log(i);

//     const totalCost = findCost(path);
//     totalCost.pressure += totalCost.ppm * (30 - totalCost.minute);
//     return totalCost.pressure;
// });

// console.log(base);

console.log(results.length);
