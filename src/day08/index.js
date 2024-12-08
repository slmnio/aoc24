import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(""));

const testInput =
    `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

/**
 * @param {{x:number,y:number}} a
 * @param {{x:number,y:number}} b
 * @returns {{x:number,y:number}}
 */
function relativeDirection(a, b) {
    return Object.fromEntries(["x", "y"].map(z => [z,a[z] - b[z]]));
}

const solution = (part, rawInput) => {
    const map = parseInput(rawInput);
    const isOnMap = ({x, y}) => (x >= 0 && x <= map.length - 1) && (y >= 0 && y <= map[0].length - 1);

    const antennaGroups = {};
    map.forEach((row, x) => {
        row.forEach((cell, y) => {
            if (cell === ".") return;
            if (!antennaGroups[cell]) antennaGroups[cell] = [];
            antennaGroups[cell].push({ x, y });
        })
    })
    const antinodes = new Set();
    const p2Antinodes = new Set();

    Object.entries(antennaGroups).forEach(([antenna, locations]) => {
        // console.log(antenna, locations);
        locations.forEach((a, aI) => {
            // get relative coords from this to all others
            // continue that relative direction once more
            // if it's on the board it's an antinode
            locations.forEach((b, bI) => {
                if (aI === bI) return;

                const relative = relativeDirection(a, b);
                const testAntinode = {
                    x: a.x + relative.x,
                    y: a.y + relative.y,
                }
                if (isOnMap(testAntinode)) {
                    antinodes.add(`${testAntinode.x},${testAntinode.y}`);
                }

                if (part === 2) {
                    p2Antinodes.add(`${a.x},${a.y}`);
                    p2Antinodes.add(`${b.x},${b.y}`);
                    while (isOnMap(testAntinode)) {
                        p2Antinodes.add(`${testAntinode.x},${testAntinode.y}`);
                        testAntinode.x += relative.x;
                        testAntinode.y += relative.y;
                    }
                }
            })
        })
    })

    if (part === 1) return antinodes.size;
    if (part === 2) return p2Antinodes.size;
};

run({
    part1: {
        tests: [
            {
                input: testInput,
                expected: 14,
            },
        ],
        solution: (...args) => solution(1, ...args),
    },
    part2: {
        tests: [
            {
              input: testInput,
              expected: 34,
            },
        ],
        solution: (...args) => solution(2, ...args),
    },
    trimTestInputs: true,
    onlyTests: false,
});
