function convertJokeToStrLine(joke) {
    return `${joke.id}|${joke.joke}|\r\n`;
}

module.exports = (jokeJsonResponse) => {
    let jokeByStrLines = '';
    let pages = 0;
    const parseData = JSON.parse(jokeJsonResponse);
    if ('results' in parseData) {
        parseData.results.forEach((element) => {
            jokeByStrLines += convertJokeToStrLine(element);
        });
        pages += (parseData.total_jokes / parseData.limit).toFixed();
    } else {
        jokeByStrLines += convertJokeToStrLine(parseData);
    }

    return { jokeByStrLines, pages };
};
