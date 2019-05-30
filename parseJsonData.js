function convertJokeToStr(joke) {
    return `${joke.id}|${joke.joke}|\r\n`;
}

function parseJsonResponseData(data) {
    let jokes = '';
    let pages = 0;
    const parseData = JSON.parse(data);
    if ('results' in parseData) {
        JSON.parse(data).results.forEach((element) => {
            jokes += convertJokeToStr(element);
        });
        pages += (parseData.total_jokes / parseData.limit).toFixed();
    } else {
        jokes += convertJokeToStr(parseData);
    }

    return { jokes, pages };
}

module.exports = parseJsonResponseData;
