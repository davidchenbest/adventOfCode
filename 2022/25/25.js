const readFile = require('../../readFile')
const KEY = {
    2: 2,
    1: 1,
    0: 0,
    '-': -1,
    '=': -2,
}
main()
async function main() {
    const inputs = (await readFile('input')).split(/\n/)
    const total = inputs.reduce((acc, a) => acc + convertToDecimal(a), 0)
    const r = convert(total)
    console.log(r);
    // console.log(inputs.map(a => convertToDecimal(a)).map(a => convert(a)));
}

function convertToDecimal(input) {
    const L = input.length
    let total = 0
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const decimal = KEY[char]
        const power = L - i - 1
        const val = decimal * (5 ** power)
        total += val
    }
    return total
}


function convert(num) {
    const { answer, total } = findUpper(num)
    const r = down(num, answer, total);
    return replace(r)

    function down(num, answer, total, index = 0) {
        if (num == total) return answer
        if (index == answer.length) return
        const power = answer.length - 1 - index
        let current = answer[index]
        const powerVal = 5 ** power
        for (let i = current - 1; i >= -3; i--) {
            const diff = current - i
            const val = powerVal * diff
            if ((total - val) < num) {
                answer[index] = i + 1
                total -= powerVal * (diff - 1)
                return down(num, answer, total, index + 1)
            }
        }
    }

    function findUpper(num, answer = [], total = 0) {
        if (num == total) return answer
        const power = answer.length
        const powerVal = 5 ** power
        if (num > total) {
            for (let i = 1; i < 3; i++) {
                const val = powerVal * i
                if ((val + total) > num) {
                    answer.unshift(i)
                    total += powerVal * i
                    return findUpper(num, answer, total)
                }
            }
        }
        else {
            return { answer, num, total }
        }
        answer.unshift(2)
        total += powerVal * 2
        return findUpper(num, answer, total)
    }

    function replace(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == -1) arr[i] = '-'
            else if (arr[i] == -2) arr[i] = '='
        }
        return arr.join('')
    }

}

