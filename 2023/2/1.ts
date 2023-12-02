import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

type Cube = {
  color: "red" | "green" | "blue";
  amount: number;
};

const possibleIds: number[] = [];

const combinations = {
  red: 12,
  green: 13,
  blue: 14,
};

inputRows.forEach((row, index) => {
  const id = index + 1;

  const divider = row.indexOf(":");
  const gameStr = row.slice(divider + 2);

  const sets = gameStr
    .split(";")
    .map((set) =>
      set
        .split(",")
        .map((cubes) => cubes.trim().split(" "))
        .map(([amount, color]) => ({
          amount: Number.parseInt(amount),
          color,
        }))
    )
    .flat(Number.MAX_VALUE) as Cube[];

  if (sets.every((set) => set.amount <= combinations[set.color])) {
    possibleIds.push(id);
  }
});

const sumOfPossibleIds = possibleIds.reduce((a, b) => a + b, 0);

console.log(sumOfPossibleIds);
