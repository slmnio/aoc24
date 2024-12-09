import run from "aocrunner";

const parseInput = (diskMap) => {
    const order = diskMap.split("");
    let fileID = 0;
    let blocks = [];
    const space = [];
    const sizes = {};

    for (let i = 0; i < order.length; i++) {
        let num = parseInt(order[i]);
        if (i % 2 === 0) {
            // file
            sizes[fileID] = num;
            for (let j = 0; j < num; j++) {
                blocks.push(fileID);
            }
            fileID++;
        } else {
            // free space
            space.push({ size: num, index: blocks.length });

            for (let j = 0; j < num; j++) {
                blocks.push(null);
            }
        }
    }
    return { blocks, space, sizes };
};

function checksum(blocks) {
    let count = 0;
    for (let i = 0; i < blocks.length; i++) {
        // if (blocks[i] === null) break;
        count += (i * (blocks[i] || 0));
    }
    return count;
}

const testInput = `2333133121414131402`;

const part1 = (rawInput) => {
    const { blocks, sizes } = parseInput(rawInput);

    let left = 0;
    let right = blocks.length - 1;

    // console.log(blocks);

    while (left < right) {
        if (blocks[left] === null) {
            while (right > left) {
                if (blocks[right] !== null) {
                    blocks[left] = blocks[right];
                    blocks[right] = null;
                    break;
                }
                right--;
            }
        }
        left++;
    }

    // console.log(blocks);

    return checksum(blocks);
};

const part2 = (rawInput) => {
    const { blocks, space, sizes } = parseInput(rawInput);

    let right = blocks.length - 1;

    while (right > 0) {
        if (blocks[right] !== null) {
            let fileID = blocks[right];
            let fileSize = sizes[fileID];

            let spaceIndex = space.findIndex(s => s.size >= fileSize && s.index < right);

            let firstAvailableSpace = space[spaceIndex];
            if (firstAvailableSpace) {
                for (let i = 0; i < fileSize; i++) {
                    blocks[right - i] = null;
                    blocks[firstAvailableSpace.index + i] = fileID;
                }

                if (firstAvailableSpace.size !== fileSize) {
                    space[spaceIndex] = {
                        size: firstAvailableSpace.size - fileSize,
                        index: firstAvailableSpace.index + fileSize
                    };
                } else {
                    space.splice(spaceIndex, 1)
                }
                right--;

            } else {
                // No valid space for this file size, move on
                right -= (fileSize);
            }
        } else {
            right--;
        }
    }
    return checksum(blocks);
};

run({
    part1: {
        tests: [
            {
              input: testInput,
              expected: 1928,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: testInput,
                expected: 2858,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
