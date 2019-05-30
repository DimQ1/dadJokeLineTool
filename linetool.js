const process = require('process');
const jokeServise = require('./jokeServise');
const askTypeTask = require('./askTypeTask');

if (process.argv[2] === '--randomJoke') {
    jokeServise.getRandomJoke();
} else if (process.argv[2] === '--searchTearm') {
    const search = process.argv[3] ? process.argv[3] : '';
    jokeServise.searchJoke(search);
} else if (process.argv[2] === '--leaderboard') {
    jokeServise.displayLeaderboardJoke();
} else {
    (async () => {
        const question = await askTypeTask();
        if (question.value === 0) {
            jokeServise.getRandomJoke();
        } else if (question.value === 1) {
            jokeServise.searchJoke(question.searchTerm);
        } else if (question.value === 2) {
            jokeServise.displayLeaderboardJoke();
        }
    })();
}
