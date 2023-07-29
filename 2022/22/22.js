const readFile = require('../../readFile')

class Direction {
    constructor(name) {
        this.name = name
        this.left = null
        this.right = null
    }
}
//  n
//w   e
//  s
const n = new Direction('n')
const s = new Direction('s')
const e = new Direction('e')
const w = new Direction('w')
n.left = w
n.right = e
s.left = e
s.right = w
w.left = s
w.right = n
e.left = n
e.right = s

let CURRENT = e

main()
async function main() {
    const [grid, instructs] = await parse()
    let position = [0, 0]
    // let position = [6, 3]
    for (let instruct of instructs) {
        if (instruct === 'L') CURRENT = CURRENT.left
        else if (instruct === 'R') CURRENT = CURRENT.right
        else {
            instruct = +instruct
            const direction = CURRENT.name
            if (direction == 'e') {
                position = runnerE(grid, position, instruct+1)

            }
            else if (direction == 's') {
                position = runnerS(grid, position, instruct+1)
            }
            else if (direction == 'w') {
                position = runnerW(grid, position, instruct+1)

            }
            else {
                position = runnerN(grid, position, instruct+1)
            }
        }
    }
    console.log(position);
    const r = position[0] + 1
    const c = position[1] + 1
    printGrid(grid)
    console.log(r * 1000 + c * 4);
}

function runnerS(grid, position, count) {
    const col = position[1]
    let pre = position[0]
    for (let row = position[0]; row < grid.length; row++) {
        const cell = grid[row][col]
        if (count === 0 || cell === '#') return [pre, col]
        else if (cell == undefined || cell == ' ') continue
        // else if (cell == '.')
        {
            grid[row][col] = 'v'
            pre = row
            count--
        }
    }
    if (!lookAheadN(grid, 0, col)) return [pre, col]
    return runnerS(grid, [0, col], count)

}
function runnerN(grid, position, count) {
    const col = position[1]
    let pre = position[0]
    for (let row = pre; row > -1; row--) {
        const cell = grid[row][col]
        if (count === 0 || cell === '#') return [pre, col]
        else if (cell == undefined || cell == ' ') continue
        // else if (cell == '.')
        {
            grid[row][col] = '^'
            pre = row
            count--
        }
    }
    if (!lookAheadN(grid, grid.length - 1, col)) return [pre, col]
    return runnerN(grid, [grid.length - 1, col], count)

}

function runnerE(grid, position, count) {
    const row = position[0]
    let pre = position[1]
    for (let col = position[1]; col < grid[row].length; col++) {
        const cell = grid[row][col]
        if (count === 0 || cell === '#') return [row, pre]
        else if (cell == undefined || cell == ' ') continue
        // else if (cell == '.')
        {
            grid[row][col] = '>'
            pre = col
            count--
        }
    }
    if (!lookAheadE(grid, row, 0)) return [row, pre]
    return runnerE(grid, [row, 0], count)
}

function runnerW(grid, position, count) {
    const row = position[0]
    let pre = position[1]
    for (let col = pre; col > -1; col--) {
        const cell = grid[row][col]
        if (count === 0 || cell === '#') return [row, pre]
        else if (cell == undefined || cell == ' ') continue
        // else if (cell == '.')
        {
            grid[row][col] = '<'
            pre = col
            count--
        }
    }
    if (!lookAheadE(grid, row, grid[row].length - 1)) return [row, pre]
    return runnerW(grid, [row, grid[row].length - 1], count)
}

function lookAheadN(grid, row, col) {
    if (row == 0) {
        for (row; row < grid.length; row++) {
            const cell = grid[row][col];
            if (cell == '.') return true
            if (cell == '#') return false
        }
    }
    else {
        for (row; row > -1; row--) {
            const cell = grid[row][col];
            if (cell == '.') return true
            if (cell == '#') return false
        }
    }

}

function lookAheadE(grid, row, col) {
    if (col === 0) {
        for (col; col < grid[row].length; col++) {
            const cell = grid[row][col];
            if (cell == '.') return true
            if (cell == '#') return false
        }
    }
    else {
        for (col; col > -1; col--) {
            const cell = grid[row][col];
            if (cell == '.') return true
            if (cell == '#') return false
        }
    }
}

async function parse() {
    const [map, des] = (await readFile('input')).split(/\n\n/)
    const grid = map.split(/\n/).map(m => m.split(''))
    const instructions = des.match(/(\d+)|[LR]/g)
    return [grid, instructions]
}

function printGrid(grid) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}