//NOT WORKING
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

    function runner(current = 'AA', ele = 'AA', time = 26, total = 0, opened = new Set()) {
        // 1 time to open or move to another valve
        if (time === 0) return total
        const key = `${current},${ele},${time},${total}`
        if (CACHE.has(key)) return CACHE.get(key)
        time--
        const oneIterationTotal = calTotal(valves, opened)
        total += oneIterationTotal
        const possibles = []


        //move to other values
        // const valve = valves[current]
        const pairsOfPath = genPairs([...valves[current].paths, ...valves[ele].paths])
        for (const [first, second] of pairsOfPath) {
            if (!opened.has(first) && !opened.has(second)) {
                possibles.push(runner(first, second, time, total, new Set([...opened.values()])))
            }
        }

        if (!possibles.length) {
            //spend remaining time 
            const r = oneIterationTotal * time + total
            CACHE.set(key, r)
            return r
        }

        //open current valve human
        const openCurrentValve = runner(current, ele, time, total, new Set([...opened.values(), current]))
        const openCurrentValveEle = runner(current, ele, time, total, new Set([...opened.values(), ele]))
        if(current != ele)possibles.push(runner(current, ele, time, total, new Set([...opened.values(), ele, current])))
        possibles.push(openCurrentValve, openCurrentValveEle)


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


function genPairs(arr) {
    const pairs = []
    for (let i = 0; i < arr.length; i++) {
        const first = arr[i];
        for (let j = i; j < arr.length; j++ ){
            const sec = arr[j];
            pairs.push([first, sec])
        }

    }
    return pairs

}