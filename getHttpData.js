const fs = require('fs');
const { httprequest } = require('./httprequest');

const filePath = `${__dirname}\\joke.txt`;

function getJokeData(path, callback) {
    httprequest(path, (jokes, pages) => {
        if (pages > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 1; i < pages; i++) {
                const pagePath = `${path === '/search' ? `${path}?` : `${path}&`}page=${i}`;
                httprequest(pagePath, (joke, page) => {
                    callback(jokes);
                });
            }
        } else {
            callback(jokes);
        }
    });
}

function saveJoke(textJoke) {
    fs.appendFile(filePath, textJoke, (err) => {
        if (err) throw err;
        console.log(textJoke);
    });
}

const getData = {
    searchTerm: function (searchTerm) {
        fs.writeFileSync(filePath, '');
        const search = searchTerm ? `?term=${searchTerm}` : '';
        getJokeData(`/search${search}`, saveJoke);
    },
    randomJoke: function () {
        fs.writeFileSync(filePath, '');
        getJokeData('/', saveJoke);
    }
};


module.exports = getData;
