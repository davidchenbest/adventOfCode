const readFile = require('../../readFile')
const MATCH_NUMS = /(-?\d)+/g

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    let signals = parse(inputs)
    const [x, y] = findMinMaxXY(signals)
    const minc = x[0]
    const maxc = x[1]
    const minr = y[0]
    const maxr = y[1]
    const grid = Array.from(new Array(maxr - minr + 1), () => new Array(maxc - minc + 1).fill('.'))

    //draw
    for (const { sensor, beacon } of signals) {
        fill({ grid, minr, minc, row: sensor[1], col: sensor[0], replace: 'S' })
        fill({ grid, minr, minc, row: beacon[1], col: beacon[0], replace: 'B' })
    }
    
    // eliminateSpot({grid,sensor:[8,7],beacon:[2,10],minc,minr})
    for (const {sensor,beacon} of signals) {
        eliminateSpot({grid,sensor,beacon,minc,minr})
    }

    printGrid(grid)

}

function parse(inputs) {
    const signals = []
    for (const input of inputs) {
        const [x1, y1, x2, y2] = input.match(MATCH_NUMS).map(n => +n)
        signals.push({ sensor: [x1, y1], beacon: [x2, y2] })
    }
    return signals
}

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        console.log(row.join('') + i);

    }
}

function findMinMaxXY(signals) {
    const initi = signals[0].sensor
    let minx = initi[0], maxx = minx, miny = initi[1], maxy = miny

    for (const { sensor, beacon } of signals) {
        minx = Math.min(minx, sensor[0], beacon[0])
        miny = Math.min(miny, sensor[1], beacon[1])
        maxx = Math.max(maxx, sensor[0], beacon[0])
        maxy = Math.max(maxy, sensor[1], beacon[1])
    }
    return [[minx, maxx], [miny, maxy]]
}

function fill({ grid, minr, minc, row, col, replace }) {
    row -= minr
    col -= minc
    grid[row][col] = replace
}

function distanceBetween(x1, y1, x2, y2) {
    // let distance = Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2, 2)))
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function validPosition(grid, row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return false
    return true
}

function eliminateSpot({ grid, sensor, beacon, minr, minc }) {
    const start = [sensor[0]-minc, sensor[1]-minr]
    const D = distanceBetween(...start, beacon[0]-minc, beacon[1]-minr)
    const queue = [start]
    const visited= new Set([`${start[1]},${start[0]}`])
    while (queue.length) {
        const [c, r] = queue.shift()
        const top = [r - 1, c]
        const bottom = [r + 1, c]
        const left = [r, c - 1]
        const right = [r, c + 1]
        const directions = [top, bottom, left, right]
        
        for (let i = 0; i < directions.length; i++) {
            const [row,col] = directions[i];
            const key =`${row},${col}`
            // console.log(key);
            if(!validPosition(grid,row,col))continue
            if(visited.has(key))continue
            if (grid[row][col] === '.') {
                const distanceFromStart = distanceBetween(...start, col, row)
                if (distanceFromStart <= D) {
                    fill({ grid, minr:0, minc:0, row, col, replace: '#' })
                }
            }
            visited.add(key)
            queue.push([col,row])
            
        }
    }

}