fs = require('fs')

module.exports = async (input) => new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', function (err, data) {
        if (err) {
            return reject(err);
        }
        return resolve(data)
    });
})