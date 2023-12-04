import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split(/\r\n?|\n/g) as string[];
let result = 0;

readCardsRecursively(0, inputRows.length);

function readCardsRecursively(startIndex: number, length: number) {
  result += length;

  for (let i = startIndex; i < startIndex + length; i++) {
    const row = inputRows[i];
    const firstColonIndex = row.indexOf(":");
    const [winningNumberString, cardNumberString] = row
      .slice(firstColonIndex + 1)
      .split(/\| +/);
    const cardNumbers = cardNumberString.split(/ +/g);
    const winningCardNumbers = cardNumbers.filter((cardNumber) =>
      winningNumberString.includes(` ${cardNumber} `)
    );

    if (winningCardNumbers.length) {
      readCardsRecursively(i + 1, winningCardNumbers.length);
    }
  }
}
console.log(result);
