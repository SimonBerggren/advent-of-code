import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

const grid = inputRows.map((row) => row.split(""));

const partNumbers: number[] = [];

function getSymbol(x: number, y: number) {
  if (y < 0 || y >= grid.length) {
    return undefined;
  }

  if (x < 0 || x >= grid[y].length) {
    return undefined;
  }

  const char = grid[y][x];

  if (char !== "." && Number.isNaN(Number(char))) {
    return { position: `${x}:${y}`, char };
  }
}

function getAdjacentSymbols(x: number, y: number) {
  return [
    getSymbol(x - 1, y),
    getSymbol(x + 1, y),
    getSymbol(x, y - 1),
    getSymbol(x, y + 1),
    getSymbol(x - 1, y - 1),
    getSymbol(x + 1, y + 1),
    getSymbol(x - 1, y + 1),
    getSymbol(x + 1, y - 1),
  ].filter(Boolean);
}

const gears: { [key: string]: number[] } = {};

for (let y = 0; y < grid.length; y++) {
  let number = "";

  for (let x = 0; x < grid[y].length; x++) {
    let char = grid[y][x];
    let parsedChar = Number(char);
    let shouldAddPartNumber = false;
    const adjacentGears = {};

    if (!isNaN(parsedChar)) {
      number += char;

      const adjacent = getAdjacentSymbols(x, y);
      if (adjacent.length) {
        shouldAddPartNumber = true;
        adjacent
          .filter((a) => a.char === "*")
          .forEach((a) => {
            adjacentGears[a.position] = true;
          });
      }

      while (++x < grid[y].length) {
        char = grid[y][x];
        parsedChar = Number(char);

        if (!isNaN(Number(char))) {
          const adjacent = getAdjacentSymbols(x, y);
          if (adjacent.length) {
            shouldAddPartNumber = true;
            adjacent
              .filter((a) => a.char === "*")
              .forEach((a) => {
                adjacentGears[a.position] = true;
              });
          }

          number += char;
        } else {
          break;
        }
      }

      if (shouldAddPartNumber) {
        Object.entries(adjacentGears).forEach(([position]) => {
          if (!gears[position]) {
            gears[position] = [];
          }

          gears[position].push(Number(number));
        });
        partNumbers.push(Number(number));
      }
    }

    number = "";
  }
}

const gearsWithTwoPartNumbers = Object.entries(gears)
  .filter(([_, partNumbers]) => partNumbers.length === 2)
  .map(([_, partNumbers]) => partNumbers[0] * partNumbers[1])
  .reduce((a, b) => a + b, 0);

console.log(gearsWithTwoPartNumbers);
