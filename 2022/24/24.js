const readFile = require('../../readFile')
let MAX_ROW, MAX_COL
let FINAL_ROW, FINAL_COL
let BLIZZARDS
main()
async function main() {
    const rows = (await readFile('test')).split(/\n/)
    MAX_ROW = rows.length
    MAX_COL = rows[0].length
    FINAL_ROW = MAX_ROW - 1
    FINAL_COL = MAX_COL - 2
    BLIZZARDS = { 0: parse(rows) }

    let row = 0
    let col = 1
    bfs(row, col)

    // PART 2
    // return to start
    let lastIndex = Object.keys(BLIZZARDS).length - 1
    let lastBlizzardMap = BLIZZARDS[lastIndex]
    BLIZZARDS = { 0: lastBlizzardMap }
    row = FINAL_ROW
    col = FINAL_COL
    FINAL_ROW = 0
    FINAL_COL = 1
    bfs(row, col)

    //move to end
    lastIndex = Object.keys(BLIZZARDS).length - 1
    lastBlizzardMap = BLIZZARDS[lastIndex]
    BLIZZARDS = { 0: lastBlizzardMap }
    FINAL_ROW = row
    FINAL_COL = col
    row = 0
    col = 1
    bfs(row, col)

    function bfs(row, col, time = 0) {
        const queue = [[row, col, time]]
        const visited = new Set()
        while (queue.length) {
            let [r, c, steps] = queue.shift()

            if (!BLIZZARDS[steps + 1]) BLIZZARDS[steps + 1] = moveBlizzards(BLIZZARDS[steps])
            const next = BLIZZARDS[steps + 1]

            const top = [r - 1, c]
            const bottom = [r + 1, c]
            const left = [r, c - 1]
            const right = [r, c + 1]
            const stay = [r, c]
            const directions = [top, bottom, left, right, stay]

            for (const direction of directions) {
                const nr = direction[0]
                const nc = direction[1]
                const key = `${nr},${nc},${steps + 1}`
                if (nr == FINAL_ROW && nc == FINAL_COL) return console.log(steps + 1);
                if (!validPosition(next, nr, nc)) continue
                if (visited.has(key)) continue
                visited.add(key)
                queue.push([nr, nc, steps + 1])
            }
        }
        // incase wait before enter
        return bfs(row, col, time + 1)
    }

}

function validPosition(blizzards, row, col) {
    if (row == FINAL_ROW && col == FINAL_COL) return true
    if (row < 1 || row >= MAX_ROW - 1 ||
        col < 1 || col >= MAX_COL - 1) return false
    const key = `${row},${col}`
    const b = blizzards.get(key)
    if (!b || b.length == 0) return true
    return false
}

function parse(rows) {
    const blizzards = new Map()
    for (let row = 1; row < rows.length - 1; row++) {
        for (let col = 1; col < rows[row].length - 1; col++) {
            const direction = rows[row][col];
            if (direction == '.') continue
            const key = `${row},${col}`
            if (blizzards.has(key)) throw 'blizzard exists'
            blizzards.set(key, [direction])
        }
    }
    return blizzards
}

function moveBlizzards(blizzards) {
    const next = new Map()
    for (const [spot, directions] of blizzards.entries()) {
        const [row, col] = spot.split(',')
        for (const d of directions) {
            if (d == '>') {
                let right = +col + 1
                if (right === MAX_COL - 1) right = 1
                addBlizzard(next, row, right, d)
            }
            else if (d == 'v') {
                let down = +row + 1
                if (down === MAX_ROW - 1) down = 1
                addBlizzard(next, down, col, d)
            }
            else if (d == '^') {
                let up = +row - 1
                if (up === 0) up = MAX_ROW - 2
                addBlizzard(next, up, col, d)
            }
            else if (d == '<') {
                let left = +col - 1
                if (left === 0) left = MAX_COL - 2
                addBlizzard(next, row, left, d)
            }
            else {
                throw 'error direction'
            }
        }
    }
    return next
}

function addBlizzard(blizzards, row, col, direction) {
    const key = `${row},${col}`
    if (blizzards.has(key)) {
        const spot = blizzards.get(key)
        spot.push(direction)
    }
    else {
        blizzards.set(key, [direction])
    }
}