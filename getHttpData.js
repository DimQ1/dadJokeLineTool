const https = require('https');

const options = {
    hostname: 'icanhazdadjoke.com',
    port: 443,
    method: 'GET',
    headers: { Accept: 'application/json' }
};

function getJokeData(options, path, callback) {
    options.path = path;
    httprequest(options, (jokes, pages) => {
        if (pages > 1) {
            for (let i = 1; i < pages; i++) {
                options.path = `${path === '/search' ? path + '?' : path + "&"}page=${i}`;
                httprequest(options, (jokes, pages) => {
                    callback(jokes)
                });
            }
        }
        else {
            callback(jokes)
        }
    })
}

function httprequest(options, callback) {
    const req = https.request(options, (res) => {
        let data = '';
        let pages = 0;

        res.on('data', (d) => {
            data += d;
        });

        res.on('end', () => {
            let jokes = '';
            let parseData = JSON.parse(data);
            if ('results' in parseData) {
                JSON.parse(data).results.forEach(element => {
                    jokes += `${element.id}|${element.joke}\n`;
                });
                pages = (parseData.total_jokes / parseData.limit).toFixed();
            }
            else {
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


let getData = {
    searchTerm: function (searchTerm, callback) {
        let search = searchTerm ? `?term=${searchTerm}` : '';
        getJokeData(options, '/search' + search, callback);
    },
    randomJoke: function (callback) {
        getJokeData(options, '/', callback);
    }
};


module.exports = getData;