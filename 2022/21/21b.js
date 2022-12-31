const readFile = require('../../readFile')
main()
const M = new Map()
async function main() {
    const inputs = (await readFile('test')).split(/\n/)
    parse(inputs)
    for (const monkey of M.keys()) {
        if (monkey == 'root' || monkey == 'humn') continue
        runner(monkey)
    }
    const [m1, op, m2] = M.get('root')
    const one = M.get(m1)
    const two = M.get(m2)
    if (Number.isInteger(one)) {
        console.log(runner2(m2, one));
    }
    else {
        console.log(runner2(m1, two));
    }

}

function parse(inputs) {
    for (const input of inputs) {
        const [monkey, command] = input.split(':')
        const c = command.trim().split(' ')
        const value = c.length == 1 ? +c[0] : c
        M.set(monkey, value)
    }
}

// find missing
function runner2(monkey, total) {
    if (monkey === 'humn') return total
    const command = M.get(monkey)
    if (Number.isInteger(command)) return command
    const [m1, op, m2] = command
    let one = m1 != 'humn' ? M.get(m1) : null
    let two = m2 != 'humn' ? M.get(m2) : null
    if (Number.isInteger(one) && !Number.isInteger(two)) {
        if (op == '+') return runner2(m2, total - one)
        else if (op == '-') return runner2(m2, total + one)
        else if (op == '*') return runner2(m2, total / one)
        else if (op == '/') return runner2(m2, total * one)
    }
    else if (!Number.isInteger(one) && Number.isInteger(two)) {
        if (op == '+') return runner2(m1, total - two)
        else if (op == '-') return runner2(m1, total + two)
        else if (op == '*') return runner2(m1, total / two)
        else if (op == '/') return runner2(m1, total * two)
    }
    else 'error'
}

//calculate all possible monekys
function runner(monkey) {
    if (monkey == 'root' || monkey == 'humn') return
    const command = M.get(monkey)
    if (Number.isInteger(command)) return command
    const [m1, op, m2] = command
    const one = runner(m1)
    const two = runner(m2)
    let result
    if (op == '+') result = one + two
    else if (op == '-') result = one - two
    else if (op == '*') result = one * two
    else if (op == '/') result = one / two
    if (!Number.isInteger(result)) return
    M.set(monkey, result)
    return result
}
