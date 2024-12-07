import run from "aocrunner";

/**
 *
 * @param {string} rawInput
 * @returns {{total: number, numbers: number[]}[]}
 */
const parseInput = (rawInput) => rawInput.split("\n").map(row => {
    const [total, itemList] = row.split(": ");
    return {
        total: parseInt(total),
        numbers: itemList.split(" ").map(x => parseInt(x))
    }
});

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

function calculate(numbers, operations, log) {
    if (log) console.log(numbers, operations);
    const testNumbers = structuredClone(numbers);
    let total = testNumbers.shift();
    if (log) console.log("====")
    if (log) console.log("starting with", total)
    operations.forEach((op, i) => {
        if (op === "*") {
            total *= testNumbers[i];
            if (log) console.log("*", testNumbers[i], "=", total);
        } else if (op === "+") {
            total += testNumbers[i];
            if (log) console.log("+", testNumbers[i], "=", total);
        } else if (op === "||") {
            total = parseInt(`${total}${testNumbers[i]}`);
            if (log) console.log("||", testNumbers[i], "=", total);
        }
    })
    if (log) console.log("total", total);
    if (log) console.log("==========");
    if (log) debugger;
    return total;
}

const part1 = (rawInput) => {
    const equations = parseInput(rawInput);

    const results = equations.map(equation => {
        const testCount = Math.pow(2, equation.numbers.length - 1);
        for (let i = 0; i < testCount; i++) {
            const operations = [...equation.numbers].slice(1, equation.numbers.length).map((_,n) => {
                const mask = 1 << n;
                return ["*", "+"][(i & mask) ? 0 : 1]
            })
            let testTotal = calculate(equation.numbers, operations);
            if (testTotal === equation.total) {
                return equation.total;
            }
        }
        return 0;
    })
    return results.reduce((prev, val) => prev + val, 0);
};

const part2 = (rawInput) => {
    const equations = parseInput(rawInput);

    const results = equations.map(equation => {
        // console.log("equation goal", equation.total, equation.numbers);
        const opTypes = ["*", "+", "||"];
        const testCount = Math.pow(opTypes.length, equation.numbers.length - 1);


        // console.log(testCount);
        for (let i = 0; i < testCount; i++) {
            const indexes = (equation.numbers.slice(1).map((n, i2) => Math.floor(i / (Math.pow(opTypes.length, i2))) % opTypes.length)).reverse();
            // console.log(i, indexes)
            const operations = indexes.map(num => opTypes[num]);
            // console.log(operations)
            let testTotal = calculate(equation.numbers, operations, false);
            if (testTotal === equation.total) {
                return equation.total;
            }
        }
        return 0;
    })
    return results.reduce((prev, val) => prev + val, 0);
};

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 3749,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: testInput,
                expected: 11387,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
