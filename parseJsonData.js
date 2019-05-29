function parseJsonResponseData(data) {
    let jokes = '';
    let pages = 0;
    const parseData = JSON.parse(data);
    if ('results' in parseData) {
        JSON.parse(data).results.forEach((element) => {
            jokes += `${element.id}|${element.joke}\n`;
        });
        pages += (parseData.total_jokes / parseData.limit).toFixed();
    } else {
        jokes += `${parseData.id}|${parseData.joke}\n`;
    }

    return { jokes, pages };
}

module.exports = parseJsonResponseData;
