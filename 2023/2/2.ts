import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "input.txt");
export const input = fs.readFileSync(inputPath).toString();
export const inputRows = input.split("\n") as string[];

type Cube = {
  color: "red" | "green" | "blue";
  amount: number;
};

type Game = {
  red: number;
  green: number;
  blue: number;
};

const powerOfGames: number[] = [];

inputRows.forEach((row) => {
  const game: Game = {
    red: Number.MIN_VALUE,
    green: Number.MIN_VALUE,
    blue: Number.MIN_VALUE,
  };

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
    .flat(Number.MAX_VALUE)
    .reduce((acc, curr: Cube) => {
      if (curr.amount > acc[curr.color]) {
        acc[curr.color] = curr.amount;
      }
      return acc;
    }, game) as Game;

  powerOfGames.push(sets.red * sets.green * sets.blue);
});

const sumOfPowers = powerOfGames.reduce((a, b) => a + b, 0);

console.log(sumOfPowers);
