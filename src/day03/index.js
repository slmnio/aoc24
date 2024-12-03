import run from "aocrunner";
const sum = (val, cur) => val + cur;

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
  const commands = [...rawInput.matchAll(regex)].map(r => [r[1],r[2]].map(x => parseInt(x, 10)));
  const outputs = commands.map(([x, y]) => x * y)

  return outputs.reduce(sum);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
