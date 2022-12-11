const readFile = require('../../readFile')

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    let count = 1
    // each count represent the state at the end of the cycle
    let counts = [count]
    for (const input of inputs) {
        const [cmd, num] = input.split(' ')
        counts.push(count)
        if (cmd === 'addx') {
            count += +num
            counts.push(count)
        }
    }
    console.log(draw(counts));
    // console.log(counts.length);
}

function draw(counts) {
    const grid = Array.from(Array(6), () => new Array(40));
    for (let i = 0; i < counts.length - 1; i++) {
        const position = counts[i];
        const cycle = (i + 1) % 40
        const row = parseInt(i / 40)
        const col = i % 40
        if (position <= cycle && cycle < position + 3) {
            grid[row][col] = '#'
        }
        else grid[row][col] = '.'
    }

    for (const row of grid) {
        console.log(row.join(''));
    }
}