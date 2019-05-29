const https = require('https');
const parseJsonResponse = require('./parseJsonData');

function httpRequest(path) {
    const options = {
        hostname: path.host,
        port: 443,
        method: 'GET',
        headers: { Accept: 'application/json' },
        path: path.pathname + path.search
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options,
            (res) => {
                let body = '';
                res.on('data', (chunk) => { body += chunk.toString(); });
                res.on('error', reject);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {
                        const parsedData = parseJsonResponse(body);
                        resolve(parsedData);
                    } else {
                        reject(new Error(`Request failed. status: ${res.statusCode}, body: ${body}`));
                    }
                });
            });
        req.on('error', reject);
        req.end();
    });
}
module.exports = httpRequest;
