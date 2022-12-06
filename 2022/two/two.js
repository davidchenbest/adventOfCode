const readFile = require("../../readFile");

const KEYS = {
    'A': 'ROCK',
    'B': 'PAPER',
    'C': 'SESSIOR',
    'X': 'ROCK',
    'Y': 'PAPER', 
    'Z': 'SESSIOR', 
}

const ENDWITH = {
    'X': 'LOSE',
    'Y': 'DRAW', 
    'Z': 'WIN',
}



async function main() {
    const data = await readFile('input')
    const rounds = data.split(/\n/)
    let points = 0
    for (const round of rounds) {
        const [o, y] = round.split(' ')
        const opp = KEYS[o]
        const you = KEYS[y]
        const endWith = ENDWITH[y]
        points += getEndWithPoints(endWith)
        if(endWith==='DRAW') points += getTypePoints(opp)
        else if(endWith==='WIN') {
            points += getTypePoints(whatBeatsIt(opp))
        }
        else if (endWith==='LOSE'){
            points += getTypePoints(whatLoseIt(opp))
        }
        else throw 'invalid'

    }
    
    console.log(points);
}
main()

function getTypePoints(type) {
    if (type === 'ROCK') return 1
    if (type === 'PAPER') return 2
    if (type === 'SESSIOR') return 3
    throw 'invalid type' + type
}

function getEndWithPoints(type){
    if (type === 'LOSE') return 0
    if (type === 'DRAW') return 3
    if (type === 'WIN') return 6
    throw 'invalid type' + type 
}

function getPlayPoints(){
        //     if (opp === you) {
        //     points += 3;
        //     continue;
        // }
        // else if (opp === 'ROCK') {
        //     if (you === 'SESSIOR') continue
        //     points += 6
        // }
        // else if (opp === 'PAPER') {
        //     if (you === 'ROCK') continue
        //     points += 6
        // }
        // else if (opp === 'SESSIOR') {
        //     if (you === 'PAPER') continue
        //     points += 6
        // }
        // else throw 'invalid'
}

function whatBeatsIt(type){
    if (type === 'ROCK') return 'PAPER'
    if (type === 'PAPER') return 'SESSIOR'
    if (type === 'SESSIOR') return 'ROCK'
    throw 'invalid'
}

function whatLoseIt(type){
    if (type === 'ROCK') return 'SESSIOR'
    if (type === 'PAPER') return 'ROCK'
    if (type === 'SESSIOR') return 'PAPER'
    throw 'invalid'
}