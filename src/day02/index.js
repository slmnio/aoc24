import run from "aocrunner";

/**
 *
 * @param {string} rawInput
 * @returns {number[][]}
 */
const parseInput = (rawInput) => {
    return rawInput.split("\n").map(line => line.split(" ").map(x => parseInt(x)))
};

const part1 = (rawInput) => {
    const reports = parseInput(rawInput);

    const safeReports = reports.filter(report => {

        let isIncreasing = true;
        let isDecreasing = true;
        let safeDifference = true;

        for (let i = 1; i < report.length; i++) {
            let current = report[i];
            let last = report[i - 1];

            if (!(current > last)) {
                isIncreasing = false;
            }
            if (!(current < last)) {
                isDecreasing = false;
            }

            const diff = Math.abs(current - last);
            if (diff > 3 || diff < 1) {
                safeDifference = false;
            }

        }

        return safeDifference && ((isIncreasing || isDecreasing) && (!(isIncreasing && isDecreasing)))
    });

    return safeReports.length;
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
