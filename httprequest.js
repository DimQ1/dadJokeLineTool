const https = require('https');
const parseJsonResponse = require('./parseJsonData');

function httprequest(path, callback) {
    const options = {
        hostname: path.host,
        port: 443,
        method: 'GET',
        headers: { Accept: 'application/json' },
        path: path.pathname + path.search
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', () => {
            const parsedData = parseJsonResponse(data);

            return callback(parsedData.jokes, parsedData.pages);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}
exports.httprequest = httprequest;
