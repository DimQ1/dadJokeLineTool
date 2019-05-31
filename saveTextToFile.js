const path = require('path');
const fs = require('fs');

module.exports = function (fileName) {
    const filePath = path.join(__dirname, fileName);

    return function (text) {
        fs.appendFile(filePath, text, (err) => {
            if (err) throw err;
        });
    };
};
