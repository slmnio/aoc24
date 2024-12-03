import run from "aocrunner";
const sum = (val, cur) => val + cur;

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
    const commands = [...rawInput.matchAll(regex)].map(r => [r[1], r[2]].map(x => parseInt(x, 10)));
    const outputs = commands.map(([x, y]) => x * y)

    return outputs.reduce(sum);
};

const part2 = (rawInput) => {
    const commands = [...rawInput.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].map(r => ({
        index: r.index,
        numbers: [r[1], r[2]].map(x => parseInt(x, 10))
    }));

    const dos = [...rawInput.matchAll(/(do(?:n't)?)\(\)/g)].map(r => ({
        index: r.index,
        enable: r[1] === 'do',
        disable: r[1] === 'don\'t',
    }));

    const allCommands = [...commands, ...dos].sort((a,b) => a.index - b.index);

    let enabled = true;
    let count = 0;

    for (let i = 0; i < allCommands.length; i++) {
        let command = allCommands[i];
        if (command.disable) enabled = false;
        if (command.enable) enabled = true;
        if (enabled && command.numbers) {
            count += (command.numbers[0] * command.numbers[1])
        }
    }

    return count;
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
            {
              input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
              expected: 48,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
