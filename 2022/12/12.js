const readFile = require('../../readFile')

main()
async function main() {
    const grid = (await readFile('input')).split(/\n/).map(input => input.split(''))
    //BFS to get shortest path
    fromAnyA(grid)


}

function fromS(grid){
    const start = findPoint(grid,'S','a')
    const end = findPoint(grid,'E','z')

    const queue = [[...start, 0]]
    const visited = new Set([`${start[0]},${start[1]}`])
    while (queue.length) {
        const [row, col, d] = queue.shift()

        const top = [row - 1, col]
        const bottom = [row + 1, col]
        const left = [row, col - 1]
        const right = [row, col + 1]
        const directions = [top, bottom, left, right]
        for (const direction of directions) {
            const nr = direction[0]
            const nc = direction[1]
            const key = `${nr},${nc}`
            if (!validPosition(grid, nr, nc)) continue
            if (visited.has(key)) continue
            if (!canGo(grid[row][col], grid[nr][nc])) continue
            if(nr===end[0] && nc===end[1])return console.log(d+1);
            visited.add(key)
            queue.push([nr,nc,d+1])
        }
    }
}
function fromAnyA(grid){
    // move backwards from Z to any a
    const start = findPoint(grid,'E','z')
    // replace S with a
    findPoint(grid,'S','a')

    const queue = [[...start, 0]]
    const visited = new Set([`${start[0]},${start[1]}`])
    while (queue.length) {
        const [row, col, d] = queue.shift()

        const top = [row - 1, col]
        const bottom = [row + 1, col]
        const left = [row, col - 1]
        const right = [row, col + 1]
        const directions = [top, bottom, left, right]
        for (const direction of directions) {
            const nr = direction[0]
            const nc = direction[1]
            const key = `${nr},${nc}`
            if (!validPosition(grid, nr, nc)) continue
            if (visited.has(key)) continue
            if (!canGo2(grid[row][col], grid[nr][nc])) continue
            if(grid[nr][nc]==='a')return console.log(d+1);
            visited.add(key)
            queue.push([nr,nc,d+1])
        }
    }
}



function validPosition(grid, row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return false
    return true
}

function canGo(from, to) {
    let t = to.charCodeAt(0)
    let f = from.charCodeAt(0)
    if (t - f < 2) return true
    return false
}

function canGo2(from, to) {
    let t = to.charCodeAt(0)
    let f = from.charCodeAt(0)
    if (f - t < 2) return true
    return false
}

function findPoint(grid,letter,replace) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const l = grid[row][col]
            if (letter === l) {
                grid[row][col] = replace
                return [row, col]
            }
        }
    }
    throw 'cant find point'
}