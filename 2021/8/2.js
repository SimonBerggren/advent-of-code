const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const lines = input.split('\n');
const output = lines.map((line) => line.split(' '));

const mapLetters = (line) => {
    const map = {};

    const one = line.find(l => l.length === 2).split('');
    const seven = line.find(l => l.length === 3).split('');
    const eight = line.find(l => l.length === 7).split('');

    const top = seven.reduce((p, c) => !one.includes(c) ? c : p, undefined);

    map.a = top;

    const four = line.find(l => l.length === 4).split('');

    const midOrTopLeft = four.filter(l => !one.includes(l));

    map.b = midOrTopLeft.filter(mt => line.filter(l => l.length >= 6).every(w => w.includes(mt)))[0]
    map.d = midOrTopLeft.filter(d => d !== map.b)[0];

    map.f = one.filter(mt => line.filter(l => l.length >= 6).every(w => w.includes(mt)))[0];
    map.c = one.filter(d => d !== map.f)[0];

    map.g = eight.filter(l => line.filter(l => l.length >= 5).every(w => l !== map.f && l !== map.a && w.includes(l)))[0];

    const mappedLetters = Object.keys(map).reduce((p, c) => map[c] ? p.concat(map[c]) : p, []);
    map.e = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter(l => !mappedLetters.includes(l))[0];

    const digits = line.slice(line.indexOf('|') + 1);

    const remappedDigits = digits.map(d => {
        return d.split('').map(l => Object.keys(map).find(k => map[k] === l)).sort().join('');
    })
        .map(digit => {
            return [
                { key: 'abcefg', value: 0 },
                { key: 'cf', value: 1 },
                { key: 'acdeg', value: 2 },
                { key: 'acdfg', value: 3 },
                { key: 'bcdf', value: 4 },
                { key: 'abdfg', value: 5 },
                { key: 'abdefg', value: 6 },
                { key: 'acf', value: 7 },
                { key: 'abcdefg', value: 8 },
                { key: 'abcdfg', value: 9 }
            ].find(({ key }) => digit === key).value;
        })
        .join('')

    return Number(remappedDigits);
};

const remappedDigits = output.map(mapLetters);

const total = remappedDigits.reduce((count, digit) => count + digit, 0);

console.log(total);