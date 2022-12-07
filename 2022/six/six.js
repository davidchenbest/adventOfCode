const readFile = require('../../readFile')

main()
async function main() {
    const inputs = (await readFile('input'))
    let left =0
    const map = new Map()
    for (let right = 0; right < inputs.length; right++) {
        if (map.size === 14) return console.log(right , map)
        const R = inputs[right]
        if (!map.get(R)) map.set(R,1)
        else{
            while(inputs[left] !== R){
                map.delete(inputs[left])
                left+=1
            }
            map.set(R,1)
            left+=1
        }
    }
    return inputs.length
}
