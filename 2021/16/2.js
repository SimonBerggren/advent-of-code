const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const map = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
};

const int = number => parseInt(number, 2);

const readLiteralValue = (input) => {
    let pos = 0;
    let value = '';
    let doneReading = false;
    while (true) {
        doneReading = input.substring(pos, ++pos) != '1';
        value += input.substring(pos, pos += 4);
        if (doneReading) {
            return { value, pos };
        }
    }
}

const calculate = (typeId, subPackages) => {
    switch (typeId) {
        case 0:
            return subPackages.reduce((a, b) => a + b, 0);
        case 1:
            return subPackages.reduce((a, b) => a * b, 1);
        case 2:
            return Math.min(...subPackages);
        case 3:
            return Math.max(...subPackages);
        case 5:
            return subPackages[0] > subPackages[1] ? 1 : 0;
        case 6:
            return subPackages[0] < subPackages[1] ? 1 : 0;
        case 7:
            return subPackages[0] == subPackages[1] ? 1 : 0;
        default:
            return undefined;
    }
}

const binaryInput = input.split('').map(char => map[char]).join('');

const readPackage = (input) => {
    const typeId = int(input.substring(3, 6));

    let pos = 6;

    let subPackages = [];

    if (typeId === 4) {
        const literal = readLiteralValue(input.substring(pos));
        pos += literal.pos;
        subPackages.push(int(literal.value));
    } else {
        const lengthType = int(input.substring(pos, ++pos));
        if (lengthType) {
            let numberOfSubPackages = int(input.substring(pos, pos += 11));
            while (numberOfSubPackages--) {
                const result = readPackage(input.substring(pos));
                pos += result.pos;
                subPackages.push(...result.subPackages);
            }
        } else {
            const totalLengthInBits = int(input.substring(pos, pos += 15));
            const end = pos + totalLengthInBits;
            let current = pos;
            while (true) {
                const result = readPackage(input.substring(current, end));
                current += result.pos;
                subPackages.push(...result.subPackages);

                if (current >= end) {
                    break;
                }
            }
            pos += totalLengthInBits;
        }
    }

    const result = calculate(typeId, subPackages);
    if (result !== undefined) {
        subPackages = [result];
    }

    return { pos, subPackages };
}

const sum = readPackage(binaryInput).subPackages.pop();

console.log(sum);