import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split(/\r\n?|\n/g) as string[];

const result = inputRows.map((row) => {
  const firstColonIndex = row.indexOf(":");
  const [winningNumberString, cardNumberString] = row
    .slice(firstColonIndex + 1)
    .split(/\| +/);
  const cardNumbers = cardNumberString.split(/ +/g);
  const winningCardNumbers = cardNumbers.filter((cardNumber) =>
    winningNumberString.includes(` ${cardNumber} `)
  );

  if (!winningCardNumbers.length) {
    return 0;
  }

  return Math.pow(2, winningCardNumbers.length - 1);
});

const output = result.reduce((a, b) => a + b, 0);

console.log(output);
