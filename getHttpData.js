const httprequest = require('./httprequest');

const saveJoke = require('./saveJoke');

const JokeUrl = new URL('https://icanhazdadjoke.com/');

async function getSearchTermJokeData(searchTerm, callback) {
    const urlPath = new URL(JokeUrl.href);
    urlPath.pathname = '/search';
    urlPath.searchParams.set('term', searchTerm);

    const response = await httprequest(urlPath);

    if (response.pages > 1) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < response.pages; i++) {
            urlPath.searchParams.set('page', i);
            // eslint-disable-next-line no-await-in-loop
            const pageResponse = await httprequest(urlPath);
            saveJoke.toFile(pageResponse.jokes);
        }
    } else {
        saveJoke.toFile(response.jokes);
    }
}

const getData = {
    searchTerm: function (searchTerm) {
        saveJoke.clearFile();
        getSearchTermJokeData(searchTerm, saveJoke.toFile);
    },
    randomJoke: async function () {
        saveJoke.clearFile();
        const response = await httprequest(JokeUrl);
        saveJoke.toFile(response.jokes);
    }
};

module.exports = getData;
