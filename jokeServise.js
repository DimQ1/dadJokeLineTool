const httprequest = require('./httprequest');
const saveJoke = require('./saveJoke')('joke.txt');
const loadJokeFromFile = require('./loadJokeFromFile')('joke.txt');
const parseJsonResponse = require('./parseJsonData');
const leaderJoke = require('./leaderJoke');

const jokeUrl = new URL('https://icanhazdadjoke.com/');

async function getSearchTermJokeData(searchTerm, callback) {
    const urlPath = new URL(jokeUrl.href);
    urlPath.pathname = '/search';
    urlPath.searchParams.set('term', searchTerm);

    const response = await httprequest(urlPath);
    const parsedData = parseJsonResponse(response);
    if (parsedData.pages > 1) {
        const responses = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < response.pages; i++) {
            urlPath.searchParams.set('page', i);
            // eslint-disable-next-line no-await-in-loop
            responses.push(httprequest(urlPath));
        }
        Promise.all(responses)
            .then(results => results.forEach((pageResponse) => {
                const parsedPageData = parseJsonResponse(pageResponse);
                saveJoke(parsedPageData.jokes);
            }));
    } else {
        saveJoke(parsedData.jokes);
    }
}

module.exports = {
    searchJoke: function (searchTerm) {
        getSearchTermJokeData(searchTerm, saveJoke.toFile);
    },
    getRandomJoke: async function () {
        const response = await httprequest(jokeUrl);
        const parsedData = parseJsonResponse(response);
        saveJoke(parsedData.jokes);
    },
    displayLeaderboardJoke: (async () => {
        const jokes = await loadJokeFromFile();
        const liderJokeText = await leaderJoke(jokes);
        console.log(liderJokeText);

        return liderJokeText;
    })
};
