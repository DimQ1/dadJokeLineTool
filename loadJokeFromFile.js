const fs = require('fs');

const fsPromises = fs.promises;
const path = require('path');

function parseJokeByStrLines(fileText) {
    const regexp = /(\w+?\|)(.|\r\n)+?(\|\r\n)/g;
    const rowsText = fileText.match(regexp);
    const jokes = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rowsText.length; i++) {
        const parsedRow = rowsText[i].split('|', 2);
        jokes.push({ id: parsedRow[0], text: parsedRow[1] });
    }

    return jokes;
}

module.exports = function (fileName) {
    const filePath = path.join(__dirname, fileName);

    return () => {
        const jokes = fsPromises.readFile(filePath)
            .then(data => parseJokeByStrLines(data.toString()))
            .catch((err) => { throw err; });

        return jokes;
    };
};
