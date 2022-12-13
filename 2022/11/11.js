const readFile = require('../../readFile')

let SUPERMODULO = 1
const MONKEYS = []
class Monkey {
    constructor({ items, operationFun, testNum, testTrueNum, testFalseNum }) {
        this.inpections = 0
        this.items = items
        this.operationFun = operationFun
        this.testNum = testNum
        this.testTrueNum = testTrueNum
        this.testFalseNum = testFalseNum
    }
    test() {
        while (this.items[0] !== undefined) {
            this.inpections++
            let item = this.items.shift()
            item = this.operationFun(item)
            // item = parseInt(item / 3)
            item = item % SUPERMODULO
            if (item % this.testNum === 0) this.throw(MONKEYS[this.testTrueNum], item)
            else this.throw(MONKEYS[this.testFalseNum], item)
        }
    }
    throw(monkey, item) {
        monkey.items.push(item)
    }
}

// MONKEYS.push(new Monkey({
//     items: [79, 98], operationFun: (item) => item * 19, testNum: 23, testTrueNum: 2, testFalseNum: 3
// }))
// MONKEYS.push(new Monkey({
//     items: [54, 65, 75, 74], operationFun: (item) => item + 6, testNum: 19, testTrueNum: 2, testFalseNum: 0
// }))
// MONKEYS.push(new Monkey({
//     items: [79, 60, 97], operationFun: (item) => item * item, testNum: 13, testTrueNum: 1, testFalseNum: 3
// }))
// MONKEYS.push(new Monkey({
//     items: [74], operationFun: (item) => item + 3, testNum: 17, testTrueNum: 0, testFalseNum: 1
// }))

MONKEYS.push(new Monkey({
    items: [89, 74], operationFun: (item) => item * 5, testNum: 17, testTrueNum: 4, testFalseNum: 7
}))
MONKEYS.push(new Monkey({
    items: [75, 69, 87, 57, 84, 90, 66, 50], operationFun: (item) => item + 3, testNum: 7, testTrueNum: 3, testFalseNum: 2
}))
MONKEYS.push(new Monkey({
    items: [55], operationFun: (item) => item + 7, testNum: 13, testTrueNum: 0, testFalseNum: 7
}))
MONKEYS.push(new Monkey({
    items: [69, 82, 69, 56, 68], operationFun: (item) => item + 5, testNum: 2, testTrueNum: 0, testFalseNum: 2
}))
MONKEYS.push(new Monkey({
    items: [72, 97, 50], operationFun: (item) => item + 2, testNum: 19, testTrueNum: 6, testFalseNum: 5
}))
MONKEYS.push(new Monkey({
    items: [90, 84, 56, 92, 91, 91], operationFun: (item) => item * 19, testNum: 3, testTrueNum: 6, testFalseNum: 1
}))
MONKEYS.push(new Monkey({
    items: [63, 93, 55, 53], operationFun: (item) => item * item, testNum: 5, testTrueNum: 3, testFalseNum: 1
}))
MONKEYS.push(new Monkey({
    items: [50, 61, 52, 58, 86, 68, 97], operationFun: (item) => item + 4, testNum: 11, testTrueNum: 5, testFalseNum: 4
}))




main()
function main() {
    const ROUNDS = 10000
    // update SUPERMODULO
    for (const monkey of MONKEYS) {
        SUPERMODULO *= monkey.testNum
    }
    
    for (let i = 0; i < ROUNDS; i++) {
        for (const monkey of MONKEYS) {
            monkey.test()
        }
    }
    let I = []
    for (const monkey of MONKEYS) {
        I.push(monkey.inpections)
    }
    I.sort((a, b) => b - a)
    console.log(I[0] * I[1]);

}
// async function parseInput() {
    // const everyEmptyLine = /(\h*\n){2,}/
//     const inputs = (await readFile('input')).split(everyEmptyLine)
//     for (const input of inputs) {
//         const steps = input.split(/\n/)
//         steps.shift()
//         const items = steps[0]?.split(':')[1]?.split(',').map(item => +item)
//         const op = steps[1].split('old')[1].trim().split(' ')
//         const operationFun = op[0] === '*' ? (item) => item * (+op[1]) : (item) => item + (+op[1])
//         const testNum = +steps[2].split(' ').pop()
//         const testTrueNum = +steps[3].split(' ').pop()
//         const testFalseNum = +steps[4].split(' ').pop()
//         const monkey = new Monkey({ items, operationFun, testNum, testTrueNum, testFalseNum })
//         MONKEYS.push(monkey)
//     }
//     console.log(MONKEYS);

// }