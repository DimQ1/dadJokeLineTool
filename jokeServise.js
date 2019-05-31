/* eslint-disable no-console */
const httpRequest = require('./httpRequest');
const saveTextToFile = require('./saveTextToFile')('joke.txt');
const loadJokeFromFile = require('./loadJokeFromFile')('joke.txt');
const parseJsonResponse = require('./parseJsonData');
const getLeaderJoke = require('./getLeaderJoke');

const jokeUrl = new URL('https://icanhazdadjoke.com/');

async function getSearchTermJokeData(searchTerm) {
    const urlPath = new URL(jokeUrl.href);
    urlPath.pathname = '/search';
    urlPath.searchParams.set('term', searchTerm);

    let jokes;
    const response = await httpRequest(urlPath);
    const parsedData = parseJsonResponse(response);
    jokes += parsedData.jokes;
    if (parsedData.pages > 1) {
        const responses = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < parsedData.pages; i++) {
            urlPath.searchParams.set('page', i);
            responses.push(httpRequest(urlPath));
        }
        await Promise.all(responses)
            .then(results => results.forEach((pageResponse) => {
                const parsedPageData = parseJsonResponse(pageResponse);
                jokes += parsedPageData.jokes;
            }));
    }
    saveTextToFile(jokes);

    return jokes;
}

module.exports = {
    searchJoke: async function (searchTerm) {
        const jokes = await getSearchTermJokeData(searchTerm);
        console.log(jokes);

        return jokes;
    },
    getRandomJoke: async function () {
        const response = await httpRequest(jokeUrl);
        const parsedData = parseJsonResponse(response);
        saveTextToFile(parsedData.jokes);
        console.log(parsedData.jokes);

        return parsedData.jokes;
    },
    displayLeaderboardJoke: (async () => {
        const jokes = await loadJokeFromFile();
        const liderJokeText = await getLeaderJoke(jokes);
        console.log(liderJokeText);

        return liderJokeText;
    })
};
