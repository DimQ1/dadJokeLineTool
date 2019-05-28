const https = require('https');

function httprequest(path, callback) {
    const options = {
        hostname: 'icanhazdadjoke.com',
        port: 443,
        method: 'GET',
        headers: { Accept: 'application/json' },
        path
    };

    const req = https.request(options, (res) => {
        let data = '';
        let pages = 0;
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', () => {
            let jokes = '';
            const parseData = JSON.parse(data);
            if ('results' in parseData) {
                JSON.parse(data).results.forEach((element) => {
                    jokes += `${element.id}|${element.joke}\n`;
                });
                pages = (parseData.total_jokes / parseData.limit).toFixed();
            } else {
                jokes += `${parseData.id}|${parseData.joke}\n`;
            }

            return callback(jokes, pages);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}
exports.httprequest = httprequest;
