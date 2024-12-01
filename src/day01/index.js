import run from "aocrunner";

const sum = (val, cur) => val + cur

/**
 * @param {string} rawInput
 */
const parseInput = (rawInput) => {
    const rows = rawInput.split("\n");
    /**
     * @type {number[][]}
     */
    let lists = [[], []];
    rows.forEach(row => row.split("   ").forEach((num, i) => lists[i].push(parseInt(num))));
    return lists;
};

const part1 = (rawInput) => {
    const lists = parseInput(rawInput);

    const sortedLists = [...lists].map(list => list.sort());

    const diffs = sortedLists[0].map((num, i) => Math.abs(sortedLists[0][i] - sortedLists[1][i]));

    return diffs.reduce(sum, 0);
};

const part2 = (rawInput) => {
    const lists = parseInput(rawInput);

    const seen = new Map();
    lists[1].forEach((num) => {
        seen.set(num, (seen.get(num) || 0) + 1)
    })
    const similarities = lists[0].map((num) => {
        return num * (seen.get(num) || 0)
    });

    return similarities.reduce(sum, 0);
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
