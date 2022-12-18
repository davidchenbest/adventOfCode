const readFile = require('../../readFile')
const MATCH_NUMS = /(-?\d)+/g
const VALVE_MATCH = /valve (..) /gi
const VALVE_PATHS = /to valves* (.)*/gi
/*
1. store all valves,rate and its path to other valves in obj
2. start AA dfs all possible path, 
store path have opened and calculate presure release
decrement time
base condition: time up or all paths opened 
*/

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    const valves = parse(inputs)

    const CACHE = new Map()

    console.log(runner());

    function runner(current = 'AA', time = 29, total = 0, opened = new Set()) {
        // 1 time to open or move to another valve
        if (time === 0) return total
        const key = `${current},${time},${total}`
        if (CACHE.has(key)) return CACHE.get(key)
        time--
        const oneIterationTotal = calTotal(valves, opened)
        total += oneIterationTotal
        const possibles = []


        //move to other values
        const valve = valves[current]
        for (const path of valve.paths) {
            if (!opened.has(path)) {
                possibles.push(runner(path, time, total, new Set([...opened.values()])))
            }
        }

        if (!possibles.length) {
            //spend remaining time 
            const r = oneIterationTotal * time + total
            CACHE.set(key, r)
            return r
        }

        //open current valve
        const openCurrentValve = runner(current, time, total, new Set([...opened.values(), current]))
        possibles.push(openCurrentValve)


        const r = Math.max(...possibles)
        CACHE.set(key, r)
        return r

    }

}

function calTotal(valves, opened) {
    let total = 0
    for (const v of opened.values()) {
        const { rate } = valves[v]
        total += rate
    }
    return total

}



function parse(inputs) {
    const valves = {}
    for (const input of inputs) {
        const rate = +input.match(MATCH_NUMS)
        const valve = input.match(VALVE_MATCH)[0].trim().split(' ')[1]
        const paths = input.match(VALVE_PATHS)[0].split(' ').slice(2).map(p => p.replace(',', ''))
        valves[valve] = { rate, paths }
    }
    return valves
}