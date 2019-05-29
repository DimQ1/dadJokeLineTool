const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'joke.txt');
fs.writeFileSync(filePath, '');

module.exports = function (textJoke) {
    fs.appendFile(filePath, textJoke, (err) => {
        if (err) throw err;
        console.log(textJoke);
    });
};
