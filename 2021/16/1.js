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

const binaryInput = input.split('').map(char => map[char]).join('');

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


const readPackage = (input) => {
    let version = int(input.substring(0, 3));
    const typeId = int(input.substring(3, 6));

    let pos = 6;

    if (typeId === 4) {
        const result = readLiteralValue(input.substring(pos));
        pos += result.pos;
    } else {
        const lengthType = int(input.substring(pos, ++pos));
        if (lengthType) {
            let numberOfSubPackages = int(input.substring(pos, pos += 11));
            while (numberOfSubPackages--) {
                const result = readPackage(input.substring(pos));
                version += result.version;
                pos += result.pos;
            }
        } else {
            const totalLengthInBits = int(input.substring(pos, pos += 15));
            const endPos = pos + totalLengthInBits;
            let currentPos = pos;
            while (true) {
                const result = readPackage(input.substring(currentPos, endPos));
                version += result.version;
                currentPos += result.pos;

                if (currentPos >= endPos) {
                    break;
                }
            }
            pos += totalLengthInBits;
        }
    }

    return { version, pos };
}

console.log(readPackage(binaryInput).version);