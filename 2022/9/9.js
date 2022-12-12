const readFile = require('../../readFile')

class LinkList {
    constructor(pos={ row: 0, col: 0 }) {
        this.pos = pos
        this.next = null
    }
}

const H = new LinkList()
const one = new LinkList()
const two = new LinkList()
const three = new LinkList()
const four = new LinkList()
const five = new LinkList()
const six = new LinkList()
const seven = new LinkList()
const eight = new LinkList()
const nine = new LinkList()
H.next = one
one.next = two
two.next = three
three.next = four
four.next = five
five.next = six
six.next = seven
seven.next = eight
eight.next = nine

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)

    let pos = new Set()
    pos.add(`0,0`)

    for (const input of inputs) {
        const [direction, num] = input.split(' ')
        for (let i = 0; i < num; i++) {
            let cur = H
            // move head
            if (direction === 'R') {
                cur.pos.col++
            }
            else if (direction === 'L') {
                cur.pos.col--
            }
            else if (direction === 'U') {
                cur.pos.row--
            }
            else {
                cur.pos.row++
            }
            // check if rest of links need to be move
            while (cur.next) {
                const result = moveTail(cur.pos, cur.next.pos)
                if (result) {
                    cur.next.pos = result
                    if (cur.next.next === null) {
                        pos.add(`${cur.next.pos.row},${cur.next.pos.col}`)
                    }
                }
                else break
                // console.log(cur.pos);
                cur = cur.next
            }
        }
    }
    console.log(pos.size);

    // getPoints(H)

    // let A = new LinkList()
    // let a = A
    // for (const p of pos) {
    //     const [row,col] = p.split(',')
    //     a.next = new LinkList({row,col})
    //     a=a.next
    // }
    // A=A.next
    // getPoints(A)
}

function getPoints(H) {
    let cur = H
    let arr = []
    while (cur) {
        arr.push(`(${cur.pos.col}, ${cur.pos.row * -1})`);
        cur = cur.next
    }
    console.log(arr.join(','));
}

function moveTail(head, tail) {
    // return tail pos
    if (Math.abs(head.col - tail.col) > 1 && Math.abs(head.row - tail.row) > 1) {
        // midpoint formula
        return { row: (head.row + tail.row) / 2, col: (head.col + tail.col) / 2 }
    }
    if (Math.abs(head.col - tail.col) > 1) {
        // head left of tail
        if (head.col < tail.col) return { row: head.row, col: tail.col - 1 }
        return { row: head.row, col: tail.col + 1 }
    }
    if (Math.abs(head.row - tail.row) > 1) {
        if (head.row < tail.row) return { row: tail.row - 1, col: head.col }
        return { row: tail.row + 1, col: head.col }
    }
    return false
}


// const r = moveTail({row:1,col:1},{row:1,col:3})
// const r = moveTail({row:1,col:2},{row:3,col:1})
// const r = moveTail({row:3,col:2},{row:1,col:1})
// const r = moveTail({row:2,col:3},{row:3,col:1})
// const r = moveTail({row:2,col:1},{row:3,col:3})
// const r = moveTail({row:-2,col:1},{row:-1,col:1})
// console.log(r);