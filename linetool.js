const process = require('process');
const getData = require('./getHttpData');
const promptsData = require('./promptsModule');

if (process.argv[2] === '--leaderboard') {
    getData.randomJoke();
} else if (process.argv[2] === '--searchTearm') {
    const search = process.argv[3] ? process.argv[3] : '';
    getData.searchTerm(search);
} else {
    (async () => {
        const question = await promptsData.askTypeTask();
        if (question.value) {
            getData.searchTerm(question.searchTerm);
        } else {
            getData.randomJoke();
        }
    })();
}
