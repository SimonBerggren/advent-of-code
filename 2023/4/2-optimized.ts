import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(inputPath, "utf8");
const inputRows = input.split(/\r\n?|\n/g);
const numCards = inputRows.length;
const cardCopies = new Array(numCards).fill(1);

for (let i = 0; i < numCards; i++) {
  const row = inputRows[i];
  const [winningNumberString, cardNumberString] = row
    .split(/\|/)
    .map((part) => part.trim());
  const winningNumbers = new Set(winningNumberString.split(/ +/g));
  const cardNumbers = cardNumberString.split(/ +/g);

  const matches = cardNumbers.filter((num) => winningNumbers.has(num)).length;

  if (!matches) {
    continue;
  }

  const nextCardIndex = i + 1;
  for (let j = nextCardIndex; j < nextCardIndex + matches; j++) {
    cardCopies[j] += cardCopies[i];
  }
}

const totalCards = cardCopies.reduce((a, b) => a + b, 0);
console.log(totalCards);
