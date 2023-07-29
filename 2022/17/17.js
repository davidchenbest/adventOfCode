const readFile = require('../../readFile')

const WIDTH = 7

const SHAPES = {
    '-': [new Array(4).fill('#')],
    '+': [
        ['.', '#', '.'],
        ['#', '#', '#'],
        ['.', '#', '.'],
    ],
    'l': [
        ['.', '.', '#'],
        ['.', '.', '#'],
        ['#', '#', '#'],
    ],
    '|': [
        ['#'],
        ['#'],
        ['#'],
        ['#'],
    ],
    'o': [
        ['#', '#'],
        ['#', '#'],
    ]
}

const JETS = {
    current: 0
}
main()
async function main() {
    // each rock appears 2 from left and 3 from bottom
    let currentS = 0
    const jets = (await readFile('test')).split('')

    let height = 0
    let floor = [new Array(WIDTH).fill('#')]

    // for (let i = 0; i <11; i++) {
    //     if(i==10){

    //     let ns = constructNewShape(6, 3)
    //     rockEnter(ns)
    //     // ns = constructNewShape(6, 3)
    //     // rockEnter(ns)
    //     // ns = constructNewShape(6, 3)
    //     // rockEnter(ns)
    //     // ns = constructNewShape(6, 3)
    //     // rockEnter(ns)
    //     break
    //     }
    //     let r = fall(jets, currentS)
    //     let ns = constructNewShape(r[0], currentS)
    //     rockEnter(ns)
    //     currentS = r[1]

    // }

    ns = constructNewShape(0,1)
        rockEnter(ns)
     ns = constructNewShape(0,1)
        rockEnter(ns)
     ns = constructNewShape(0,1)
        rockEnter(ns)
     ns = constructNewShape(0,1)
        rockEnter(ns)

     ns = constructNewShape(6, 3)
        rockEnter(ns)
     ns = constructNewShape(6, 3)
        rockEnter(ns)
     ns = constructNewShape(6, 3)
        rockEnter(ns)
     ns = constructNewShape(6, 3)
        rockEnter(ns)
    
         


    console.log(floor.length-1);
    printGrid(floor)


    function rockEnter(rock) {
        //first row of floor && last row of rock
        // let fRow = 0
        // for (let row = rock.length - 1; row > -1; row--) {
        //     const rr = rock[row]
        //     const fr = floor[fRow]
        //     for (let col = 0; col < fr.length; col++) {
        //         //check collide
        //         if (fr[col] === '#' && rr[col] === '#') {
        //             console.log(fRow,col);
        //             drawRockFloorOverlap(rock, row)

        //             // printGrid(floor);
        //             // console.log(row);
        //             // console.log('---');
        //             const onTop = rock.slice(0, row + 1)
        //             floor.unshift(...onTop)
        //             // console.log(col,row,fRow,onTop)
        //             return
        //         }


        //     }
        //     fRow += 1
        //     if (fRow === floor.length) {
        //         // console.log('end of florr');
        //         return
        //     }
        // }
        // // console.log('david',fRow);
        // drawRockFloorOverlap(rock, fRow)

        runner()
        function runner(fRow = 0, relativeLeft = 0) {

            for (let row = 0; row < rock.length; row++) {
                for (let col = 0; col < rock[row].length; col++) {
                    if (rock[row][col] === '#' && floor[fRow][col] === '#') {
                        if (fRow == 0) return floor.unshift(...rock)
                        else {
                            drawRockFloorOverlap(rock, fRow)
                            if (fRow < rock.length) {
                                const onTop = rock.slice(0, rock.length - fRow)
                                floor.unshift(...onTop)
                            }
                            return
                        }
                    }
                }

            }

            const jet = jets[JETS.current]
            if (JETS.current === jets.length - 1) JETS.current = 0
            else JETS.current++
            const rowsOnFloor = fRow + 1
            const rStart = rowsOnFloor < rock.length ? rock.length - rowsOnFloor : 0
            const rockBelow = rock.slice(rStart, rock.length)
            const fStart = rowsOnFloor > rock.length ? rowsOnFloor - rock.length : 0
            const floorOverlap = floor.slice(fStart, fStart + rockBelow.length)
            console.log(rockBelow);
            if (jet === '>') {
                // fRow = 2
                const canShift = canShiftEvery(rockBelow, floorOverlap, true)
                if (canShift) shiftOver(rock, true)
                // fRow = 0
            }
            else {
                const canShift = canShiftEvery(rockBelow, floorOverlap)
                if (canShift) shiftOver(rock)
            }
            // printGrid(rock)
            // console.log(floor[fRow].join(''));
            // console.log(fRow);

            return runner(fRow + 1)
        }
    }

    function canShiftEvery(a1, a2, moveRight) {
        //shift a1
        if (moveRight) {
            for (let row = 0; row < a1.length; row++) {
                for (let col = 0; col < a1[row].length - 1; col++) {
                    if (a1[row][col] == '#' && a2[row][col + 1] == '#') return false
                }
            }
        }
        else {
            for (let row = 0; row < a1.length; row++) {
                for (let col = a1[row].length - 1; col > 0; col--) {
                    if (a1[row][col] == '#' && a2[row][col - 1] == '#') return false
                }
            }
        }

        return true
    }

    function shiftOver(a1, moveRight) {
        // is on edge
        const edge = moveRight ? a1[0].length - 1 : 0
        for (let row = 0; row < a1.length; row++) {
            if (a1[row][edge] == '#') return a1
        }
        if (!moveRight) {
            for (const row of a1) {
                row.push(row.shift())
            }
        }
        else {
            for (const row of a1) {
                row.unshift(row.pop())
            }
        }
        return a1
    }

    function drawRockFloorOverlap(rock, floorRowEnd) {
        let rrow = rock.length - 1
        for (let row = floorRowEnd - 1; row > -1; row--) {
            for (let col = 0; col < floor[row].length && rrow > -1; col++) {
                if (rock[rrow][col] === '#') floor[row][col] = rock[rrow][col]
            }
            rrow -= 1
        }
        // let fRow = 0
        // for (let row = rock.length - 1; row >= rock.length - floorRowStart; row--) {
        //     for (let col = 0; col < rock[row].length; col++) {
        //         if (rock[row][col] === '#') floor[fRow][col] = '#'
        //     }
        //     fRow++
        //     if (fRow === floor.length) {

        //         console.log('end of florr');
        //         return
        //     }
        // }
    }


}
function constructNewShape(left, currentS) {
    const rocks = Object.keys(SHAPES)
    const rock = SHAPES[rocks[currentS]]
    const rockW = rock[0].length
    const newShape = []
    for (let row = 0; row < rock.length; row++) {
        const l = new Array(left).fill('.')
        const r = new Array(WIDTH - left - rockW).fill('.')
        newShape.push([...l, ...rock[row], ...r])
    }
    return newShape

}

function fall(jets, currentS) {
    const rocks = Object.keys(SHAPES)
    const rock = SHAPES[rocks[currentS]]
    const rockW = rock[0].length
    let left = 2
    let bottom = 3
    for (let i = 0; i < bottom + 1; i++) {
        const jet = jets[JETS.current]
        //move left
        if (jet === '<' && left > 0) left -= 1
        //move right
        else if (jet==='>'&&left + rockW < WIDTH) left += 1

        if (JETS.current === jets.length - 1) JETS.current = 0
        else JETS.current++
    }

    if (currentS === rocks.length - 1) currentS = 0
    else currentS += 1


    return [left, currentS]
}

function printGrid(grid) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}