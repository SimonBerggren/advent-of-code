import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

const spellings = [
  { text: "one", value: "1" },
  { text: "two", value: "2" },
  { text: "three", value: "3" },
  { text: "four", value: "4" },
  { text: "five", value: "5" },
  { text: "six", value: "6" },
  { text: "seven", value: "7" },
  { text: "eight", value: "8" },
  { text: "nine", value: "9" },
];

let total = 0;

inputRows.forEach((row) => {
  const result = row.match(/\d/g);

  let firstDigit = result?.shift();
  let firstDigitIndex = row.indexOf(firstDigit);

  let lastDigit = result?.pop() ?? firstDigit;
  let lastDigitIndex = row.lastIndexOf(lastDigit);

  spellings.forEach((spelling) => {
    const firstIndex = row.indexOf(spelling.text);
    if (
      firstDigitIndex === -1 ||
      (firstIndex !== -1 && firstIndex < firstDigitIndex)
    ) {
      firstDigit = spelling.value;
      firstDigitIndex = firstIndex;
    }

    const lastIndex = row.lastIndexOf(spelling.text);
    if (
      lastDigitIndex === -1 ||
      (lastIndex !== -1 && lastIndex > lastDigitIndex)
    ) {
      lastDigit = spelling.value;
      lastDigitIndex = lastIndex;
    }
  });

  const digits = Number.parseInt(`${firstDigit}${lastDigit}`);
  total += digits;
});

console.log(total);
