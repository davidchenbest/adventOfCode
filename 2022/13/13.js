const readFile = require('../../readFile')

main()
async function main() {
    const inputs = (await readFile('input')).split(/\n\n/)
    const indicies = []
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const [first, second] = input.split(/\n/).map(item => JSON.parse(item))
        if (isInOrder(first, second)) indicies.push(i+1)
        // console.log(isInOrder(first, second));
        // break
    }
    console.log(indicies,indicies.reduce((acc,a)=>acc+a,0));
}

function isInOrder(first, second) {
    for (let i = 0; i < first.length; i++) {
        const f = first[i];
        const s = second[i];
        if (f === undefined) return true
        console.log(f, s,i);
        if (s === undefined && f !== undefined) return false
        if (Number.isInteger(f) && Number.isInteger(s)) {
            if (f < s) {return true}
            if (f > s) return false
        }
        if (Array.isArray(f) && !Array.isArray(s) && !isInOrder(f, [s])) {return false}
        else if (!Array.isArray(f) && Array.isArray(s) && !isInOrder([f], s)) {return false }
        else if (Array.isArray(f) && Array.isArray(s) && !isInOrder(f, s)) {return false }


    }
    return true
}

function flatten(arr){
    const A =[]
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(Array.isArray(element)) A.push(...flatten(element))
        else A.push(element)
    }
    return A

}
