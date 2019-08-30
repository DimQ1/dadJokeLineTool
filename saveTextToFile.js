const path = require('path');
const fs = require('fs');

module.exports = function (fileName) {
    const filePath = path.join(__dirname, fileName);

    return function (text) {
        return new Promise((resolve, reject) => {
            fs.appendFile(filePath, text, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    };
};
