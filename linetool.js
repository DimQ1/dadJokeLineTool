const process = require('process');
const jokeServise = require('./jokeServise');
const promptsData = require('./promptsModule');

if (process.argv[2] === '--leaderboard') {
    jokeServise.getRandomJoke();
} else if (process.argv[2] === '--searchTearm') {
    const search = process.argv[3] ? process.argv[3] : '';
    jokeServise.searchJoke(search);
} else {
    (async () => {
        const question = await promptsData.askTypeTask();
        if (question.value) {
            jokeServise.searchJoke(question.searchTerm);
        } else {
            jokeServise.getRandomJoke();
        }
    })();
}
