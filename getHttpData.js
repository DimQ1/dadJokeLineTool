const { httprequest } = require('./httprequest');

const saveJoke = require('./saveJoke');

const JokeUrl = new URL('https://icanhazdadjoke.com/');

function getSearchTermJokeData(searchTerm, callback) {
    const urlPath = new URL(JokeUrl.href);
    urlPath.pathname = '/search';
    urlPath.searchParams.set('term', searchTerm);
    httprequest(urlPath, (jokes, pages) => {
        if (pages > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 1; i < pages; i++) {
                urlPath.searchParams.set('page', i);
                httprequest(urlPath, (joke, page) => {
                    callback(jokes);
                });
            }
        } else {
            callback(jokes);
        }
    });
}

const getData = {
    searchTerm: function (searchTerm) {
        saveJoke.clearFile();
        getSearchTermJokeData(searchTerm, saveJoke.toFile);
    },
    randomJoke: function () {
        saveJoke.clearFile();
        httprequest(JokeUrl, jokes => saveJoke.toFile(jokes));
    }
};

module.exports = getData;
