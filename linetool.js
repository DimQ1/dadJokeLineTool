const process = require('process');
const jokeServise = require('./jokeServise');
const askTypeTask = require('./askTypeTask');

const typeTask = {
    Random: 0,
    Search: 1,
    Liderboard: 2
};

(async () => {
    if (process.argv[2] === '--randomJoke') {
        jokeServise.getRandomJoke();
    } else if (process.argv[2] === '--searchTearm') {
        const search = process.argv[3] ? process.argv[3] : '';
        jokeServise.searchJoke(search);
    } else if (process.argv[2] === '--leaderboard') {
        jokeServise.displayLeaderboardJoke();
    } else {
        const question = await askTypeTask();
        if (question.typeTask === typeTask.Random) {
            jokeServise.getRandomJoke();
        } else if (question.typeTask === typeTask.Search) {
            jokeServise.searchJoke(question.searchTerm);
        } else if (question.typeTask === typeTask.Liderboard) {
            jokeServise.displayLeaderboardJoke();
        }
    }
})();
