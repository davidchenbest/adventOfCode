const readFile = require('../../readFile')
const MATCH_NUMS = /(-?\d)+/g

main()
async function main() {
    // row: 10
    // S:[0,5] B[5,15] d: 15
    // example point on row: [?,10]+ S:[0,5] =d:15
    // 10 or -10  
    // -10 left of 0
    // 10 right of 0

    const inputs = (await readFile('input')).split(/\n/)
    const ROW = inputs.length === 14 ? 10 : 2000000;
    let signals = parse(inputs)

    const visited = new Set()

    // loop S -> B
    for (const { sensor, beacon } of signals) {
        const SBdistance = distanceBetween(...sensor, ...beacon)

        const minDistance = distanceBetween(...sensor,sensor[0],ROW)
        if(minDistance<=SBdistance){
            const distanceAroundSensorX = SBdistance-minDistance

            for (let x = sensor[0]-distanceAroundSensorX; x <= sensor[0]+distanceAroundSensorX; x++) {
                visited.add(x)          
            }
        }
    }

    // remove S & B from visited on row ROW
    for (const { sensor, beacon } of signals) {
        if (sensor[1] == ROW) visited.delete(sensor[0])
        if (beacon[1] == ROW) visited.delete(beacon[0])
    }

    console.log(visited.size);



}

function parse(inputs) {
    const signals = []
    for (const input of inputs) {
        const [x1, y1, x2, y2] = input.match(MATCH_NUMS).map(n => +n)
        signals.push({ sensor: [x1, y1], beacon: [x2, y2] })
    }
    return signals
}

function distanceBetween(x1, y1, x2, y2) {
    // differnce (x) + difference (y)
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

