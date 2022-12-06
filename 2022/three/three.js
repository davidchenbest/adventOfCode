const readFile = require('../../readFile')

const EVERY_THREE_LINES = /(?:^.*$\n?){1,3}/

main()
async function main() {
    const data= (await readFile('input'))
    const sacks = splitBy3(data)
    let points = 0
    for (const sack of sacks) {
        const [one,two,three] = sack.split(/\n/)
        const match = findMatchingLetterFrom3(one,two,three)
        points += getPoints(match)
    
    }
    console.log(points);
}

function findMatchingLetter(first,second){
    const fset = new Set()
    const sset = new Set()
    for (let i = 0; i < first.length; i++) {
        const f = first[i];
        fset.add(f)
        if(sset.has(f))return f
        const s = second[i];
        if(fset.has(s))return s
        sset.add(s)
    }
    throw 'no match'
}

function findMatchingLetterFrom3(one,two,three){
    const f = new Set(one.split(''))
    const s = new Set(two.split(''))
    const t = new Set(three.split(''))
    for (const letter of one) {
        if(f.has(letter) && s.has(letter) && t.has(letter))return letter
    }
    throw 'no match'
}

function isUpperCase(letter){
    return letter.charCodeAt(0) < 97
}

function isLowerCase(letter){
    return letter.charCodeAt(0) > 90
}

function getPoints(letter){
    if(isLowerCase(letter)){
        return letter.charCodeAt(0) - 96
    }
    else return letter.charCodeAt(0) - 64 + 26
}

function everyLine(){
    const L = sack.length
        const mid = L/2
        const first = sack.slice(0,mid)
        const second = sack.slice(mid)
        const match = findMatchingLetter(first,second)
        points += getPoints(match)
}

function splitBy3(data){
    const lines = data.split(/\n/)
    const sacks = []
    let group =[]
    for (let i = 0; i < lines.length; i++) {
        group.push(lines[i]);
        if((i+1)%3 === 0){
            sacks.push(group.join('\n'))
            group=[]
        }
    }
    return sacks
}