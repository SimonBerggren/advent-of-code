import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, 'input.txt');
const input = readFileSync(inputPath).toString();
const inputRows = input.split('\n');

const monkeys = [];
let currentRound = 1;

for (let i = 0; i < inputRows.length; i += 7) {
    const index = inputRows[i].match(/\d/)[0];
    const startItemsStr = inputRows[i + 1].slice(18).split(', ').map(Number);
    const [left, operation, right] = inputRows[i + 2].slice(19).split(' ');
    const divideBy = Number(inputRows[i + 3].slice(21));
    const trueStr = Number(inputRows[i + 4].slice(29));
    const falseStr = Number(inputRows[i + 5].slice(29));

    monkeys.push({
        items: startItemsStr,
        operation: `${left} ${operation} ${right}`,
        divideBy,
        true: trueStr,
        false: falseStr,
        inspectedItems: 0,
    });
}

const lowestDividable = monkeys.reduce((m1, m2) => m1 * m2.divideBy, 1);

while (currentRound <= 10000) {
    monkeys.forEach((monkey) => {
        for (let i = 0; i < monkey.items.length; ++i) {
            ++monkey.inspectedItems;
            const currentWorry = monkey.items.splice(i--, 1);
            let newWorry = eval(monkey.operation.replaceAll('old', currentWorry));

            const isDividable = newWorry % monkey.divideBy === 0;

            if (newWorry > lowestDividable) {
                newWorry = lowestDividable + (newWorry % lowestDividable);
            }

            monkeys[monkey[`${isDividable}`]].items.push(newWorry);
        }
    });

    ++currentRound;
}

const [m1, m2] = monkeys.sort((m1, m2) => m2.inspectedItems - m1.inspectedItems);

console.log('Answer:', m1.inspectedItems * m2.inspectedItems);
