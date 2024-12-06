import run from "aocrunner";

const testInput =
    `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

/**
 *
 * @param rawInput
 * @returns {string[][]}
 */
const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(""));

const part1 = (rawInput) => {
    const map = parseInput(rawInput);
    let startingPosition = null;

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] === "^") {
                startingPosition = [x, y];
                break;
            }
        }
        if (startingPosition) break;
    }

    const isAtEdge = (x, y) => (x === 0 || x === map.length - 1) || (y === 0 || y === map[0].length - 1);

    let [x, y] = [...startingPosition];

    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    let direction = [-1, 0];
    let seen = new Set();

    while (!isAtEdge(x, y)) {
        // advance one step in the direction
        let [inFrontX, inFrontY] = [x,y].map((z,i) => z + direction[i]);
        if (map[inFrontX][inFrontY] === "#") {
            console.log("found obstruction at", [x,y]);
            // turn direction
            direction = directions[(directions.indexOf(direction) + 1) % directions.length]
        } else {
            // take a step
            [x, y] = [inFrontX, inFrontY];
            seen.add(`${x},${y}`);
        }
    }

    return seen.size;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 41,
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
