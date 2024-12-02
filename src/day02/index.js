import run from "aocrunner";

/**
 *
 * @param {string} rawInput
 * @returns {number[][]}
 */
const parseInput = (rawInput) => {
    return rawInput.split("\n").map(line => line.split(" ").map(x => parseInt(x)))
};

/**
 * @param {number[]} report
 * @returns {boolean}
 */
function reportIsValid(report) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < report.length; i++) {
        let current = report[i];
        let last = report[i - 1];

        if (!(current > last)) {
            isIncreasing = false;
        }
        if (!(current < last)) {
            isDecreasing = false;
        }

        if (!isIncreasing && !isDecreasing) return false;

        const diff = Math.abs(current - last);
        if (diff > 3 || diff < 1) {
            return false;
        }
    }

    return ((isIncreasing || isDecreasing) && (!(isIncreasing && isDecreasing)))
}

const part1 = (rawInput) => {
    const reports = parseInput(rawInput);

    const safeReports = reports.filter(report => reportIsValid(report));
    return safeReports.length;
};

const part2 = (rawInput) => {
    const reports = parseInput(rawInput);

    const safeReports = reports.filter(report => {
        const isSafe = reportIsValid(report);
        if (isSafe) return true;

        // check all other permutations where removing an option works

        for (let i = 0; i < report.length; i++) {
            let newLevels = [...report].filter((num, i2) => i2 !== i);
            if (reportIsValid(newLevels)) return true;
        }

        return false;
    });

    return safeReports.length;
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
