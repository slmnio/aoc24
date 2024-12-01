import run from "aocrunner";

const parseInput = (rawInput) => {
    const rows = rawInput.split("\n");
    let lists = [[],[]];
    rows.forEach(row => row.split("   ").forEach((num, i) => lists[i].push(parseInt(num))));
    return lists;
};

const part1 = (rawInput) => {

  let lists = parseInput(rawInput);

  const sortedLists = [...lists].map(list => list.sort());

  const diffs = sortedLists[0].map((num, i) => Math.abs(sortedLists[0][i] - sortedLists[1][i]))

  return diffs.reduce((val, cur, i, arr ) => val + cur, 0);
};

const part2 = (rawInput) => {
  const lists = parseInput(rawInput);

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
