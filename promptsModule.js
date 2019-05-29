const prompts = require('prompts');

module.exports = {
    askTypeTask: async () => {
        const questions = [
            {
                type: 'select',
                name: 'value',
                message: 'select type query?',
                choices: [
                    { title: 'Random', value: 0 },
                    { title: 'Search Tearm', value: 1 }
                ]
            },
            {
                type: prev => prev === 1 ? 'text' : null,
                name: 'searchTerm',
                message: 'input search term please'
            }
        ];
        const result = await prompts(questions);

        return { value: result.value, searchTerm: result.searchTerm };
    }
};
