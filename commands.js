#!/usr/bin/env node

const program = require('commander');
const {
    prompt
} = require('inquirer');
const {
    addEntry,
    findEntry,
    updateEntry,
    removeEntry,
    listEntries
} = require('./index.js');

// Entry questions
const questions = [{
        type: 'input',
        name: 'source',
        message: 'word in source language'
    },
    {
        type: 'input',
        name: 'target',
        message: 'word in target language'
    }
];

program
    .version('1.0.0')
    .description('Vocabulary Builder Tool');

// Add Command
program
    .command('add')
    .alias('a')
    .description('Add a Word')
    .action(() => {
        prompt(questions).then(answers => addEntry(answers));
    });

// Find Command
program
    .command('find <word>')
    .alias('f')
    .description('Find a word')
    .action(word => findEntry(word));


// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a Word')
    .action(_id => {
        prompt(questions).then(answers => updateEntry(_id, answers));
    });

// Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a word')
    .action(_id => removeEntry(_id));


// List Command
program
    .command('list')
    .alias('l')
    .description('List all words')
    .action(() => listEntries());

program.parse(process.argv);