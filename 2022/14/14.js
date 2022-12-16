const readFile = require('../../readFile')

main()
async function main() {
    // x =col
    // y = row
    const inputs = (await readFile('input')).split(/\n/)
    parse(inputs)
    const [x, y] = findMinMaxXY(inputs)
    const minx = x[0]
    const maxx = x[1]
    const maxy = y[1]
    const grid = Array.from(Array(maxy + 1), () => new Array(maxx - minx + 1).fill('.'))

    //draw
    for (let i = 0; i < inputs.length; i++) {
        let pre = inputs[i][0]
        for (let j = 1; j < inputs[i].length; j++) {
            const cur = inputs[i][j]
            fill({ grid, first: pre, second: cur, minx })
            pre = cur
        }
    }

    //simulate sand fall
    let count = 0
    while (!sandPour(grid, 500, minx)) {
        count++
    }
    console.log(count);
    // printGrid(grid)

}

function parse(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i] = inputs[i].split(' -> ').map(i => i.split(',').map(n => +n))
    }
}

function findMinMaxXY(inputs) {
    const initial = inputs[0][0]
    let minx = initial[0], maxx = minx, miny = initial[1], maxy = miny
    for (const input of inputs) {
        for (const num of input) {
            const [x, y] = num
            minx = Math.min(minx, x)
            miny = Math.min(miny, y)
            maxx = Math.max(maxx, x)
            maxy = Math.max(maxy, y)
        }
    }
    return [[minx, maxx], [miny, maxy]]
}

// fill({ grid, first: [498, 4], second: [498, 6], minx })
// fill({ grid, first: [502, 9], second: [494, 9], minx })
function fill({ grid, first, second, minx }) {
    if (minx === undefined) throw 'minx not defined'
    // vertical
    if (first[0] === second[0]) fillY(first[0], first[1], second[1])
    // horizontal
    else fillX(first[1], first[0], second[0])

    function fillY(x, y1, y2) {
        if (y1 > y2) return fillY(x, y2, y1)
        x = x - minx
        for (let i = y1; i <= y2; i++) {
            grid[i][x] = '#'
        }
    }
    function fillX(y, x1, x2) {
        if (x1 > x2) return fillX(y, x2, x1)
        x1 -= minx
        x2 -= minx
        for (let i = x1; i <= x2; i++) {
            grid[y][i] = '#'
        }

    }
}

function printGrid(grid) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}


function sandPour(grid, col, minx, r = 0) {
    col -= minx
    for (let row = r; row < grid.length; row++) {
        let cur = grid[row][col]
        // collison
        if (cur !== '.') {
            const left = col - 1
            const right = col + 1
            const up = row - 1
            //left
            if (validPos(grid, row, left) && grid[row][left] == '.') {
                return sandPour(grid, left + minx, minx, row)
            }
            //right
            else if (validPos(grid, row, right) && grid[row][right] == '.') {
                return sandPour(grid, right + minx, minx, row)
            }
            // up
            else{
                if (col == 0 || col == grid[0].length - 1) return true
                grid[up][col] = 'o'
                return
            }
        }
    }

}

function validPos(grid, row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return false
    return true
}
