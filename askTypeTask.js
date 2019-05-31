const prompts = require('prompts');

module.exports = async () => {
    const questions = [
        {
            type: 'select',
            name: 'value',
            message: 'select type query?',
            choices: [
                { title: 'Random', value: 0 },
                { title: 'Search Tearm', value: 1 },
                { title: 'Display liderboard joke', value: 2 }
            ]
        },
        {
            type: selectTypeQuery => selectTypeQuery === 1 ? 'text' : null,
            name: 'searchTerm',
            message: 'input search term please'
        }
    ];
    const result = await prompts(questions);

    return { value: result.value, searchTerm: result.searchTerm };
};
