import fs from "fs";
import path from "path";

const inputPath = path.resolve(__dirname, "sample.txt");
const input = fs.readFileSync(inputPath).toString();
const inputRows = input.split(/\r\n?|\n/g) as string[];

type Map = {
  from: number;
  to: number;
  diff: number;
  name: string;
};

const maps: Map[][] = [[{ from: 0, to: 0, diff: 0, name: "initial" }]];

const seeds = inputRows.shift().slice(7).split(" ").map(Number);
const seedRanges = [];

while (seeds.length) {
  const from = Number(seeds.shift());
  const range = Number(seeds.shift());

  seedRanges.push(`${from}-${from + range - 1}`);
}

// while (inputRows.length) {
//   const row = inputRows.shift();

//   if (!row) {
//     continue;
//   }

//   if (row.endsWith(":")) {
//     const almanacMap: Map[] = [];
//     const name = row;

//     while (inputRows.length) {
//       const row = inputRows.shift();

//       if (!row) {
//         break;
//       }

//       const [destFrom, srcFrom, length] = row.split(" ").map(Number);
//       const diff = destFrom - srcFrom;

//       almanacMap.push({
//         from: srcFrom,
//         to: srcFrom + length - 1,
//         diff,
//         name: name.split(" ")[0],
//       });
//     }

//     maps.push(almanacMap);
//   }
// }

// const result = seeds.map((seed) =>
//   maps.reduce(
//     (result, map) =>
//       result +
//       (map.find(({ from, to }) => from <= result && result <= to)?.diff ?? 0),
//     seed
//   )
// );

// result.sort((a, b) => a - b);

console.log(seedRanges);
