const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const inputRows = fs.readFileSync(inputPath).toString().split('\n');

const transforms = [
    ([x, y, z]) => [x, y, z],
    ([x, y, z]) => [x, z, y],
    ([x, y, z]) => [y, x, z],
    ([x, y, z]) => [y, z, x],
    ([x, y, z]) => [z, y, x],
    ([x, y, z]) => [z, x, y],

    ([x, y, z]) => [-x, y, z],
    ([x, y, z]) => [-x, z, y],
    ([x, y, z]) => [-y, x, z],
    ([x, y, z]) => [-y, z, x],
    ([x, y, z]) => [-z, y, x],
    ([x, y, z]) => [-z, x, y],

    ([x, y, z]) => [x, -y, z],
    ([x, y, z]) => [x, -z, y],
    ([x, y, z]) => [y, -x, z],
    ([x, y, z]) => [y, -z, x],
    ([x, y, z]) => [z, -y, x],
    ([x, y, z]) => [z, -x, y],

    ([x, y, z]) => [x, y, -z],
    ([x, y, z]) => [x, z, -y],
    ([x, y, z]) => [y, x, -z],
    ([x, y, z]) => [y, z, -x],
    ([x, y, z]) => [z, y, -x],
    ([x, y, z]) => [z, x, -y],

    ([x, y, z]) => [-x, -y, z],
    ([x, y, z]) => [-x, -z, y],
    ([x, y, z]) => [-y, -x, z],
    ([x, y, z]) => [-y, -z, x],
    ([x, y, z]) => [-z, -y, x],
    ([x, y, z]) => [-z, -x, y],

    ([x, y, z]) => [-x, y, -z],
    ([x, y, z]) => [-x, z, -y],
    ([x, y, z]) => [-y, x, -z],
    ([x, y, z]) => [-y, z, -x],
    ([x, y, z]) => [-z, y, -x],
    ([x, y, z]) => [-z, x, -y],

    ([x, y, z]) => [x, -y, -z],
    ([x, y, z]) => [x, -z, -y],
    ([x, y, z]) => [y, -x, -z],
    ([x, y, z]) => [y, -z, -x],
    ([x, y, z]) => [z, -y, -x],
    ([x, y, z]) => [z, -x, -y],

    ([x, y, z]) => [-x, -y, -z],
    ([x, y, z]) => [-x, -z, -y],
    ([x, y, z]) => [-y, -x, -z],
    ([x, y, z]) => [-y, -z, -x],
    ([x, y, z]) => [-z, -y, -x],
    ([x, y, z]) => [-z, -x, -y],
];

const negative = ([x, y, z]) => [-x, -y, -z];

const offsetPoint = ([x1, y1, z1], [x2, y2, z2]) => [x1 + x2, y1 + y2, z1 + z2];

const isEqual = ([x1, y1, z1], [x2, y2, z2]) => x1 == x2 && y1 == y2 && z1 == z2;

const getDistance = ([x1, y1, z1], [x2, y2, z2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);

const scannerInput = [];
let currentScanner = -1;

inputRows.forEach(row => {
    if (row.startsWith('---')) {
        scannerInput.push([]);
        ++currentScanner;
        return;
    } else if (!row) {
        return;
    }

    scannerInput[currentScanner].push(row.split(',').map(Number));
});

const scanners = scannerInput.map((scanner) => {
    return scanner.map((beacon) => {
        return {
            originalPosition: beacon,
            distances: scanner.map((otherBeacon) => getDistance(beacon, otherBeacon)).filter(distance => distance)
        }
    })
})

const getOverlaps = (scanners, transformedScannerIndex, scannerIndex) => {
    return scanners[transformedScannerIndex].map((beacon, absoluteIndex) => {
        let relativeIndex = undefined;
        scanners[scannerIndex].forEach((otherBeacon, i) => {
            if (relativeIndex == undefined && beacon.distances.filter(d1 => otherBeacon.distances.includes(d1)).length >= 11) {
                relativeIndex = i;
            }
        });

        return relativeIndex != undefined && {
            absolutePosition: scanners[transformedScannerIndex][absoluteIndex].originalPosition,
            relativePosition: scanners[scannerIndex][relativeIndex].originalPosition
        };
    }).filter(positions => positions);
}

let currentTransformIndex = 0;
const transformedScannerIndexes = [0];
const offsets = [];

while (transformedScannerIndexes.length != scanners.length) {
    const transformedScannerIndex = transformedScannerIndexes[currentTransformIndex++];
    for (let scannerIndex = 0; scannerIndex < scanners.length; scannerIndex++) {
        if (scannerIndex === transformedScannerIndex || transformedScannerIndexes.includes(scannerIndex)) {
            continue;
        }

        const overlaps = getOverlaps(scanners, transformedScannerIndex, scannerIndex);

        overlaps.forEach(overlap => {
            if (transformedScannerIndexes.includes(scannerIndex)) {
                return;
            }

            transforms.forEach(transform => {
                if (transformedScannerIndexes.includes(scannerIndex)) {
                    return;
                }

                const offset = offsetPoint(overlap.absolutePosition, transform(negative(overlap.relativePosition)));
                const overlappingPoints = overlaps.filter(point => isEqual(offsetPoint(transform(point.relativePosition), offset), point.absolutePosition));

                if (overlappingPoints.length > 11) {
                    transformedScannerIndexes.push(scannerIndex);
                    scanners[scannerIndex] = scanners[scannerIndex].map(({ originalPosition, distances }) => ({
                        originalPosition: offsetPoint(transform(originalPosition), offset),
                        distances
                    }));
                    offsets.push(offset);
                }
            });
        });
    }
}

let highestDistance = 0;
offsets.forEach(o1 => {
    offsets.forEach(o2 => {
        const distance = getDistance(o1, o2);
        if (distance > highestDistance) {
            highestDistance = distance;
        }
    })
})

console.log(highestDistance);