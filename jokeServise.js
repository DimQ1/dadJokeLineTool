/* eslint-disable no-console */
const requestJsonJoke = require('./requestJsonJoke');
const saveTextToFile = require('./saveTextToFile')(process.env.jokeFileName || 'joke.txt');
const loadJokeFromFile = require('./loadJokeFromFile')(process.env.jokeFileName || 'joke.txt');
const parseJokeJsonResponse = require('./parseJokeJsonResponse');

const jokeUrl = new URL('https://icanhazdadjoke.com/');

async function getJokes(term) {
    const jokeTermUrl = new URL(jokeUrl.href);
    jokeTermUrl.pathname = '/search';
    jokeTermUrl.searchParams.set('term', term);

    let jokeByStrLines;
    const jokeJsonResponse = await requestJsonJoke(jokeTermUrl);
    const parsedJokeJson = parseJokeJsonResponse(jokeJsonResponse);
    jokeByStrLines += parsedJokeJson.jokeByStrLines;
    if (parsedJokeJson.pages > 1) {
        const responses = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < parsedJokeJson.pages; i++) {
            jokeTermUrl.searchParams.set('page', i);
            responses.push(requestJsonJoke(jokeTermUrl));
        }
        await Promise.all(responses)
            .then(results => results.forEach((pageJokeJsonResponse) => {
                const parsedJokeJsonPage = parseJokeJsonResponse(pageJokeJsonResponse);
                jokeByStrLines += parsedJokeJsonPage.jokeByStrLines;
            }));
    }
    await saveTextToFile(jokeByStrLines);

    return jokeByStrLines;
}

function getLeaderJoke(jokeByStrLines) {
    const jokeStatistic = jokeByStrLines.reduce((statisticsAccumulator, joke) => {
        const count = (statisticsAccumulator[joke.id] ? statisticsAccumulator[joke.id].count : 0) + 1;
        statisticsAccumulator[joke.id] = { count, joke: joke.text };

        return statisticsAccumulator;
    }, {});

    let maxVal;
    let leaderJokeId;

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(jokeStatistic)) {
        if (!maxVal || value.count > maxVal) {
            maxVal = value.count;
            leaderJokeId = key;
        }
    }

    return jokeStatistic[leaderJokeId].joke;
}

module.exports = {
    searchJoke: async function (term) {
        const jokeByStrLines = await getJokes(term);
        console.log(jokeByStrLines);

        return jokeByStrLines;
    },
    getRandomJoke: async function () {
        const jokeJsonResponse = await requestJsonJoke(jokeUrl);
        const parsedJokeJson = parseJokeJsonResponse(jokeJsonResponse);
        await saveTextToFile(parsedJokeJson.jokeByStrLines);
        console.log(parsedJokeJson.jokeByStrLines);

        return parsedJokeJson.jokeByStrLines;
    },
    displayLeaderboardJoke: (async () => {
        const jokeByStrLines = await loadJokeFromFile();
        const liderJokeText = getLeaderJoke(jokeByStrLines);
        console.log(liderJokeText);

        return liderJokeText;
    })
};
