module.exports = (async (jokes) => {
    const jokeStatistic = jokes.reduce((acc, el) => {
        acc[el.id] = { count: (acc[el.id] ? acc[el.id].count : 0) + 1, joke: el.joke };

        return acc;
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
