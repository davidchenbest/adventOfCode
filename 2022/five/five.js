const readFile = require('../../readFile')

// const stacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']]

const stacks = [
    ['N', 'C', 'R', 'T', 'M', 'Z', 'P',],
    ['D', 'N', 'T', 'S', 'B', 'Z',],
    ['M', 'H', 'Q', 'R', 'F', 'C', 'T', 'G'],
    ['G', 'R', 'Z',],
    ['Z', 'N', 'R', 'H',],
    ['F', 'H', 'S', 'W', 'P', 'Z', 'L', 'D'],
    ['W', 'D', 'Z', 'R', 'C', 'G', 'M',],
    ['S', 'J', 'F', 'L', 'H', 'W', 'Z', 'Q'],
    ['S', 'Q', 'P', 'W', 'N']
]

main()
async function main() {
    const data = (await readFile('input')).split(/\n/)
    // moveOneAtATime(data)
    moveMultipleAtATime(data)

}

function moveOneAtATime(data) {
    for (const line of data) {
        const [move, from, to] = line.match(/(\d+)/g).map(n => +n)
        const temp = []
        for (let i = 0; i < move; i++) {
            const letter = stacks[from - 1].pop()
            if (!letter) continue
            temp.push(letter)
        }
        stacks[to - 1] = [...stacks[to - 1], ...temp]
    }
    let str = ''
    for (const stack of stacks) {
        str += stack.pop()
    }
    console.log(str);
}

function moveMultipleAtATime(data) {
    for (const line of data) {
        const [move, from, to] = line.match(/(\d+)/g).map(n => +n)
        const startFrom = stacks[from - 1].length - move
        const temp = stacks[from - 1].slice(startFrom)
        stacks[from - 1] = makeArray(stacks[from - 1], startFrom)
        stacks[to - 1] = [...stacks[to - 1], ...temp]
    }
    let str = ''
    for (const stack of stacks) {
        str += stack.pop()
    }
    console.log(str);
}

function makeArray(arr, L) {
    const newArr = new Array(L)
    for (let i = 0; i < newArr.length; i++) {
        newArr[i] = arr[i]
    }
    return newArr
}