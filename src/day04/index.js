import run from "aocrunner";

/**
 * @param {string} rawInput
 * @returns {string[][]}
 */
const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(""));

function getNearLocations(cells, [x, y], letter) {
    const neighbourCells = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, +1],
        [0, +1],
        [1, +1],
    ]
    return neighbourCells.filter(([nbrX, nbrY]) => cells?.[x + nbrX]?.[y + nbrY] === letter)
}

const part1 = (rawInput) => {
    const cells = parseInput(rawInput);

    let correct = 0;

    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            const coords = [x, y];
            const cell = cells[x][y];

            if (cell === "X") {
                // an XMAS must have X in it
                // look around for a M
                let nearbyMs = getNearLocations(cells, coords, "M");
                if (!nearbyMs.length) continue;

                for (const [mXOffset, mYOffset] of nearbyMs) {
                    if (cells?.[x + (mXOffset * 2)]?.[y + (mYOffset * 2)] !== "A") continue;
                    if (cells?.[x + (mXOffset * 3)]?.[y + (mYOffset * 3)] !== "S") continue;

                    correct++;
                }
                // let Aneighbours = getNear(cells, coords, "A");
                // if (!Aneighbours.length) continue;
                // let Sneighbours = getNear(cells, coords, "S");
                // if (!Sneighbours.length) continue;
            }
        }
    }

    return correct;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            {
              input: `..X...
.SAMX.
.A..A.
XMAS.S
.XMAS.`,
              expected: 5,
            },
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
