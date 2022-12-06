const readFile = require('../../readFile')

main()
async function main() {
    const data = (await readFile('input')).split(/\n/)
    let count = 0
    for (const pairs of data) {
        count += contains(pairs)
        // count += overlap(pairs)
    }
    console.log(count);
}

function contains(pairs) {
    const [f, s] = pairs.split(',')
    const [a, b] = f.split('-')
    const [c, d] = s.split('-')
    const first = { first: +a, second: +b }
    const second = { first: +c, second: +d }

    //check is both num is in between
    if (isInBetween(first.first, first.second, second.first) && isInBetween(first.first, first.second, second.second)) return 1
    if (isInBetween(second.first, second.second, first.first) && isInBetween(second.first, second.second, first.second)) return 1

    // // check if one interval fully contain another
    // if (first.first >= second.first && first.second <= second.second) return 1
    // else if (second.first >= first.first && second.second <= first.second) return 1

    return 0
}

function overlap(pairs) {
    const [f, s] = pairs.split(',')
    const [a, b] = f.split('-')
    const [c, d] = s.split('-')
    const first = { first: +a, second: +b }
    const second = { first: +c, second: +d }
    if (isInBetween(first.first, first.second, second.first)
        || isInBetween(second.first, second.second, first.first)) {
        return 1
    }
    return 0

}

function isInBetween(first, second, num) {
    if (first <= num && second >= num) return true
}
