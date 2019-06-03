const https = require('https');

module.exports = (jokeUrl) => {
    const options = {
        hostname: jokeUrl.host,
        port: 443,
        method: 'GET',
        headers: { Accept: 'application/json' },
        path: jokeUrl.pathname + jokeUrl.search
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options,
            (res) => {
                const body = [];
                res.on('data', (chunk) => { body.push(chunk); });
                res.on('error', reject);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {
                        resolve(body.toString());
                    } else {
                        reject(new Error(`Request failed. status: ${res.statusCode}, body: ${body}`));
                    }
                });
            });
        req.on('error', reject);
        req.end();
    });
};
