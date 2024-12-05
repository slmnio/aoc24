import run from "aocrunner";

/**
 *
 * @param {string} rawInput
 * @returns {{rules: number[][], updates: number[][]}}
 */
const parseInput = (rawInput) => {
    const [rules, updates] = rawInput.split("\n\n").map(x => x.split("\n"));
    return {
        rules: rules.map(line => line.split("|").map(x => parseInt(x, 10))),
        updates: updates.map(line => line.split(",").map(x => parseInt(x, 10))),
    }
};

function getMiddlePage(pages) {
    return pages[Math.floor(pages.length / 2)]
}

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

const part1 = (rawInput) => {
    const { rules, updates } = parseInput(rawInput);

    const inOrderUpdates = [];

    for (const update of updates) {
        let isInOrder = true;

        for (const [before, after] of rules) {
            let [beforeIndex, afterIndex] = [before, after].map(updateNum => update.indexOf(updateNum));
            if (beforeIndex === -1 || afterIndex === -1) continue;

            if (beforeIndex > afterIndex) {
                isInOrder = false;
            }
        }

        if (isInOrder) {
            inOrderUpdates.push(update);
        }
    }

    return inOrderUpdates.reduce((total, update) => total + getMiddlePage(update), 0);
};

const part2 = (rawInput) => {
    const { rules, updates } = parseInput(rawInput);

    const notInOrderUpdates = [];
    const rulesMemoryMap = new Set();

    for (const [before, after] of rules) {
        rulesMemoryMap.add(`${before},${after}`);
    }

    for (const update of updates) {
        let isInOrder = true;

        for (const [before, after] of rules) {
            let [beforeIndex, afterIndex] = [before, after].map(updateNum => update.indexOf(updateNum));
            if (beforeIndex === -1 || afterIndex === -1) continue;

            if (beforeIndex > afterIndex) {
                isInOrder = false;
                break;
            }
        }

        if (!isInOrder) {
            // order it properly then
            notInOrderUpdates.push(update.sort((a, b) => {
                if (rulesMemoryMap.has(`${a},${b}`)) return -1; // exists where A is smaller than B
                if (rulesMemoryMap.has(`${b},${a}`)) return 1; // exists where B is smaller than A
                return 0;
            }))
        }
    }

    return notInOrderUpdates.reduce((total, update) => total + getMiddlePage(update), 0);
};

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 143,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: testInput,
                expected: 123,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
