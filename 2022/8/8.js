const readFile = require('../../readFile')

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    const grid = parseToGrid(inputs)
    // let count = countOuter(grid)
    let max = 0
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            const score = calScenicScore(grid,i,j)
            // console.log(score, i,j);
            max = Math.max(max,score)

        }
    }
    console.log(max);
}

function parseToGrid(inputs) {
    const grid = []
    for (const nums of inputs) {
        grid.push(nums.split('').map(n => +n))
    }
    return grid
}

function countOuter(grid) {
    const rows = grid.length
    const cols = grid[0].length
    return rows * 2 + (cols - 2) * 2
}

function isVisible(grid, row, col) {
    // A tree is visible if all of the other trees between it and an edge of the grid are shorter than it
    const cur = grid[row][col]
    // top
    for (let i = row - 1; i > -1; i--) {
        let curCell = grid[i][col]
        if (curCell >= cur) break
        if (i === 0) return 1
    }
    // bottom
    for (let i = row + 1; i < grid.length; i++) {
        let curCell = grid[i][col]
        if (curCell >= cur) break
        if (i === grid.length - 1) return 1
    }
    // left
    for (let j = col - 1; j > -1; j--) {
        let curCell = grid[row][j]
        if (curCell >= cur) break
        if (j === 0) return 1
    }
    // right
    for (let j = col + 1; j < grid[0].length; j++) {
        let curCell = grid[row][j]
        if (curCell >= cur) break
        if (j === grid.length - 1) return 1
    }
    return 0
}

function calScenicScore(grid,row,col){
    let up,down,left,right=0
    const curr = grid[row][col]
    // up
    for (let i = row-1; i >-1; i--) {
        const curCell = grid[i][col]
        if(curCell>=curr || i=== 0 ){
            up = row-i
            break
        }
        
    }
    // left
    for (let i = col-1; i >-1; i--) {
        const curCell = grid[row][i]
        if(curCell>=curr || i === 0 ){
            left = col-i
            break
        }
        
    }
    // right
    for (let i = col+1; i < grid[0].length; i++) {
        const curCell = grid[row][i]
        if(curCell>=curr || i === grid[0].length-1 ){
            right = i-col
            break
        }
    }
    // down
    for (let i = row+1; i < grid.length; i++) {
        const curCell = grid[i][col]
        if(curCell>=curr || i === grid.length-1 ){
            down = i-row
            break
        }
    }

    return up * down * right * left
}