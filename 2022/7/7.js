const readFile = require('../../readFile')

class Dir {
    constructor({ name, parent = undefined }) {
        this.name = name
        this.files = []
        this.dirs = []
        this.parent = parent
    }
}


const START = new Dir({ name: '/' })
const DIR_SIZES = []
main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    inputs.shift()
    inputs.shift()
    traverseDirectories(inputs)
    calculateDirectorySize(START)
    // console.log(DIR_SIZES.filter(d => d <= 100000).reduce((acc, d) => acc + d, 0));
    calculateSizeNeed()
    

}


function traverseDirectories(inputs) {
    let curr = START
    for (const input of inputs) {
        const c = input.split(' ')
        if (c[0] === 'dir') {
            const name = c[1]
            const parent = curr
            const dir = new Dir({ name, parent })
            curr.dirs.push(dir)
        }
        else if (Number.isInteger(+c[0])) {
            curr.files.push({ name: c[1], size: +c[0] })
        }
        else if (c[0] === '$') {
            if (c[1] === 'cd') {
                const dest = c[2]
                if (dest === '..') {
                    curr = curr.parent
                    continue
                }
                for (const dir of curr.dirs) {
                    if (dir.name === dest) {
                        curr = dir
                    }
                }
            }

        }
    }
}

function calculateDirectorySize(curr, size = 0) {
    for (const file of curr.files) {
        size += file.size
    }
    for (const dir of curr.dirs) {
        size += calculateDirectorySize(dir)
    }
    DIR_SIZES.push(size)
    // console.log(`${curr.name} ${size}`);
    return size
}


function calculateSizeNeed(){
    const sizeRequire = 30000000
    const sizeLeft =  70000000 - DIR_SIZES[DIR_SIZES.length - 1]
    const sizeNeed = sizeRequire-sizeLeft
    for (const size of DIR_SIZES.sort((a, b) => a - b)) {
        if (size >= sizeNeed) {
            console.log(size);
            break
        }
    }
}

