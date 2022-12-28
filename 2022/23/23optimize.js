const readFile = require('../../readFile')

main()
const CD = ['n', 's', 'w', 'e',]
async function main() {
    const grid = (await readFile('input')).split(/\n/).map(m => m.split(''))
    // const states = []
    const states = new Set()
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            // if (grid[row][col] == '#') states.push({ row, col })
            if (grid[row][col] == '#') states.add(`${row},${col}`)
        }
    }

    for (let i = 0; i < 10; i++) {
        const { pos, changes } = getNextMoves(states, [...CD])
        moveElves(states, pos, changes)
        CD.push(CD.shift())
    }
    console.log(calculateScore(states));
}



function moveElves(states, pos, changes) {
    for (const [r, c, nr, nc] of changes) {
        const key = `${nr},${nc}`
        if (pos.get(key) != 1) continue
        const state = findState(states, r, c)
        if (state) {
            // state.row = nr
            // state.col = nc
            const oldKey = `${r},${c}`
            states.delete(oldKey)
            states.add(key)
        }
        else throw 'no state'
    }
}

function getNextMoves(states, direction) {
    const pos = new Map()
    const changes = []
    // for (const { row, col } of states) {
    for (const state of states.values()) {
        const [row,col]= state.split(',').map(n=>+n)
        let result
        for (const d of direction) {
            result = getNextD(states, row, col, d)
            if (result) break

        }
        if (!result) continue
        const [d, nr, nc] = result
        changes.push([row, col, nr, nc])
        const key = `${nr},${nc}`
        const value = pos.get(key)
        if (value) pos.set(key, value + 1)
        else pos.set(key, 1)
    }

    return { pos, changes }
}

function getNextD(states, row, col, direction) {
    const n = findState(states, row - 1, col),
        ne = findState(states, row - 1, col + 1),
        nw = findState(states, row - 1, col - 1),
        s = findState(states, row + 1, col),
        se = findState(states, row + 1, col + 1),
        sw = findState(states, row + 1, col - 1),
        w = findState(states, row, col - 1),
        e = findState(states, row, col + 1)
    const i = [n, ne, nw, s, se, sw, w, e].findIndex(c => c != false)
    if (i == -1) return

    if (direction == 'n' && !n && !ne && !nw) return ['n', row - 1, col]
    if (direction == 's' && !s && !se && !sw) return ['s', row + 1, col]
    if (direction == 'w' && !w && !nw && !sw) return ['w', row, col - 1]
    if (direction == 'e' && !e && !ne && !se) return ['e', row, col + 1]

}

function findState(states, r, c) {
    // for (const state of states) {
    //     const { row, col } = state
    //     if (row === r && col === c) return state
    // }
    // return false
    const key = `${r},${c}`
    return states.has(key)
}

function calculateScore(states) {
    const { maxr, minr, maxc, minc } = findMinMaxRowCol(states)
    const totalRows = maxr - minr + 1
    const totalCols = maxc - minc + 1
    // return totalRows * totalCols - Object.keys(states).length
    return totalRows * totalCols - states.size

    function findMinMaxRowCol(states) {
        let maxr = -Infinity,
            maxc = -Infinity,
            minr = Infinity,
            minc = Infinity
        // for (const { row, col } of states) {
        //     minr = Math.min(minr, row)
        //     maxr = Math.max(maxr, row)
        //     minc = Math.min(minc, col)
        //     maxc = Math.max(maxc, col)
        // }
        for (const state of states.values()) {
            const [row,col]= state.split(',').map(n=>+n)
            minr = Math.min(minr, row)
            maxr = Math.max(maxr, row)
            minc = Math.min(minc, col)
            maxc = Math.max(maxc, col)
        }
        return { maxr, minr, maxc, minc }
    }
}

