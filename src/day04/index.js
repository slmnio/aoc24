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

    const solution = "XMAS";

    /* technically this is y,x but the difference between columns & rows is not important in this puzzle */
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            const coords = [x, y];
            const cell = cells[x][y];

            if (cell === solution[0]) {
                // an XMAS must have X in it (and we can start looking from X since it only occurs once per XMAS)
                // look around for a M
                let nearbyMs = getNearLocations(cells, coords, solution[1]);
                if (!nearbyMs.length) continue;

                for (const [mXOffset, mYOffset] of nearbyMs) {
                    let correctNums = 2;
                    for (let i = 2; i < solution.length; i++) {
                        const letter = solution[i];
                        if (cells[x + (mXOffset * i)]?.[y + (mYOffset * i)] === letter) {
                            correctNums++;
                        }
                    }
                    if (correctNums === solution.length) {
                        correct++;
                    }
                }
            }
        }
    }

    return correct;
};

const part2 = (rawInput) => {
    const cells = parseInput(rawInput);
    let correct = 0;

    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            const cell = cells[x][y];

            if (cell === "A") {
                /*

                M.S
                .A.
                M.S

                 */

                // an X-MAS must have A in it
                // look around for Ms and Ss

                const xCells = [
                    cells[x-1]?.[y-1], /* irrelevant */ cells[x+1]?.[y-1],
                    /* irrelevant */   /*     A      */  /* irrelevant */
                    cells[x-1]?.[y+1], /* irrelevant */ cells[x+1]?.[y+1],
                ].filter(Boolean);

                // must be 2 Ms and 2 As, and they must share a side

                if (xCells.length !== 4) continue;
                if (!(xCells.filter(cell => cell === "M").length === 2 && xCells.filter(cell => cell === "S").length === 2)) continue;

                if (xCells[0] ===  xCells[3]) continue;
                if (xCells[1] ===  xCells[2]) continue;

                correct++;
            }
        }
    }

    return correct;
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
            {
              input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
              expected: 9,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
