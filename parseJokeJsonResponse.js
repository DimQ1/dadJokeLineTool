function convertJokeToStrLine(item) {
    return `${item.id}|${item.joke}|\r\n`;
}

module.exports = (jokeJsonResponse) => {
    let jokeByStrLines = '';
    let pages = 0;
    try {
        const parseData = JSON.parse(jokeJsonResponse);
        if ('results' in parseData) {
            parseData.results.forEach((element) => {
                jokeByStrLines += convertJokeToStrLine(element);
            });
            pages += (parseData.total_jokes / parseData.limit).toFixed();
        } else {
            jokeByStrLines += convertJokeToStrLine(parseData);
        }
    } catch (err) {
        console.log({ err: err, jokeJsonResponse: jokeJsonResponse });
    }

    return { jokeByStrLines, pages };
};
