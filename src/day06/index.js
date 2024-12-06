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

function printMap(map) {
    if (map.length > 20) return;
    console.log(map.map(x => x.join("")).join("\n"));
    console.log("");
}

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
            // console.log("found obstruction at", [x,y]);
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
    map[x][y] = ".";

    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    const humanDirections = ["up", "right", "down", "left"];
    const arrowDirections = ["↑","→","↓","←"];

    let directionIndex = 0;
    /** @type {Set<`${string},${string}`>} */
    let seen = new Set();
    const turns = [];

    let obstructionLoops = 0;

    while (!isAtEdge(x, y)) {
        // advance one step in the direction
        let [inFrontX, inFrontY] = [x,y].map((z,i) => z + directions[directionIndex][i]);
        if (map[inFrontX][inFrontY] === "#") {
            // console.log("found obstruction at", [x,y]);
            // turn direction
            directionIndex = (directionIndex + 1) % directions.length
            turns.push({ x, y, directionIndex });
            map[x][y] = "+"
        } else {
            // take a step
            [x, y] = [inFrontX, inFrontY];

            map[x][y] = directionIndex % 2 === 0 ? "|" : "-"
            seen.add(`${x},${y}`);
        }
    }

    /** @type {Set<`${string},${string}`>} */
    let obsPositions = new Set();


    [...seen].forEach(str => {
        const [obsX, obsY] = str.split(",").map(x => parseInt(x, 10));

        const turns = [];
        // place this in front and see if we loop

        let [testX, testY] = [...startingPosition];
        if (obsX === testX && obsY === testY) return;
        let testDirectionIndex = 0;

        while (!isAtEdge(testX, testY)) {
            // looking one tile in front (of direction of travel)
            let [testInFrontX, testInFrontY] = [testX, testY].map((z, i) => z + directions[testDirectionIndex][i]);
            const cellInFront = map[testInFrontX][testInFrontY];
            if (cellInFront === "#" || (testInFrontX === obsX && testInFrontY === obsY)) {
                // Turn

                testDirectionIndex = (testDirectionIndex + 1) % directions.length
                if (turns.find(turn => turn.x === testInFrontX && turn.y === testInFrontY && turn.direction === testDirectionIndex)) {
                    obsPositions.add(`${obsX},${obsY}`)
                    break;
                }
                turns.push({ x: testInFrontX, y: testInFrontY, direction: testDirectionIndex });
            } else {
                // Clear to move forwards
                [testX, testY] = [testInFrontX, testInFrontY]
            }
        }
    })

    return obsPositions.size;
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
            {
              input: testInput,
              expected: 6,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
