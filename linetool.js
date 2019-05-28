const fs = require('fs');
const process = require('process');
const getData = require('./getHttpData');

const filePath = __dirname + '\\joke.txt';
fs.writeFileSync(filePath, '');

if (process.argv[2] === '--leaderboard')
{
    getData.randomJoke(getJoke);
}else if (process.argv[2] === '--searchTearm') {
    let search=process.argv[3] ? process.argv[3] : '';
    getData.searchTerm(search, getJoke);
}

function getJoke(textJoke) {
    fs.appendFile(filePath, textJoke, (err) => {
        if (err) throw err;
        console.log(textJoke);
    });
}