const prompts = require('prompts');

module.exports = async () => {
    const questions = [
        {
            type: 'select',
            name: 'typeTask',
            message: 'select type query?',
            choices: [
                { title: 'Random', typeTask: 0 },
                { title: 'Search Tearm', typeTask: 1 },
                { title: 'Liderboard joke', typeTask: 2 }
            ]
        },
        {
            type: selectTypeQuery => selectTypeQuery === 1 ? 'text' : null,
            name: 'searchTerm',
            message: 'input search term please'
        }
    ];
    const result = await prompts(questions);

    return { typeTask: result.typeTask, searchTerm: result.searchTerm };
};
