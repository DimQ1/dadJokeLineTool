module.exports = (async (jokes) => {
    const jokeStatistic = jokes.reduce((statisticsAccumulator, joke) => {
        statisticsAccumulator[joke.id] = { count: (statisticsAccumulator[joke.id] ? statisticsAccumulator[joke.id].count : 0) + 1, joke: joke.joke };

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
});
