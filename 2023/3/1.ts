import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

const grid = inputRows.map((row) => row.split(""));

const partNumbers: number[] = [];

function isSymbol(x: number, y: number) {
  if (y < 0 || y >= grid.length) {
    return false;
  }

  if (x < 0 || x >= grid[y].length) {
    return false;
  }

  const char = grid[y][x];

  return char !== "." && Number.isNaN(Number(char));
}

function hasAdjacentSymbol(x: number, y: number) {
  return (
    isSymbol(x - 1, y) ||
    isSymbol(x + 1, y) ||
    isSymbol(x, y - 1) ||
    isSymbol(x, y + 1) ||
    isSymbol(x - 1, y - 1) ||
    isSymbol(x + 1, y + 1) ||
    isSymbol(x - 1, y + 1) ||
    isSymbol(x + 1, y - 1)
  );
}

for (let y = 0; y < grid.length; y++) {
  let number = "";

  for (let x = 0; x < grid[y].length; x++) {
    let char = grid[y][x];
    let parsedChar = Number(char);
    let shouldAddPartNumber = false;

    if (!isNaN(parsedChar)) {
      number += char;

      if (hasAdjacentSymbol(x, y)) {
        shouldAddPartNumber = true;
      }

      while (++x < grid[y].length) {
        char = grid[y][x];
        parsedChar = Number(char);

        if (!isNaN(Number(char))) {
          if (hasAdjacentSymbol(x, y)) {
            shouldAddPartNumber = true;
          }

          number += char;
        } else {
          break;
        }
      }

      if (shouldAddPartNumber) {
        partNumbers.push(Number(number));
      }
    }

    number = "";
  }
}

const sumOfPartNumbers = partNumbers.reduce((a, b) => a + b, 0);

console.log(sumOfPartNumbers);
