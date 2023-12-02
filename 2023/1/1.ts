import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

let total = 0;

inputRows.forEach((row) => {
  const allDigits = row.match(/\d/g);
  const firstDigit = allDigits.shift();
  const lastDigit = allDigits.pop() ?? firstDigit;
  const digits = Number.parseInt(`${firstDigit}${lastDigit}`);
  total += digits;
});

console.log(total);
