const readFile = require('../../readFile')
main()
const M = new Map()
async function main() {
    const inputs = (await readFile('test')).split(/\n/)
    parse(inputs)
    const r = runner('root')
    console.log(r);

}

function parse(inputs) {
    for (const input of inputs) {
        const [monkey, command] = input.split(':')
        const c = command.trim().split(' ')
        const value = c.length == 1 ? +c[0] : c
        M.set(monkey, value)
    }
}

function runner(monkey) {
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
    else throw 'not valid operation'
    if (!Number.isInteger(result)) return
    M.set(monkey, result)
    return result
}
