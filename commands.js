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
    listEntries,
    createDic,
    deleteDic,
    newVocab,
    removeVocab
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

// Vocab questions
const vocabQuestions = [{
    type: 'input',
    name: 'dictionary',
    message: 'chose a dictionary'
},
{
    type: 'input',
    name: 'name',
    message: 'chose a name for your vocabulary list'
}]

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


// Create directory

program
    .command('newdic <name>')
    .alias('nd')
    .action(name => createDic(name));

// Remove dictionary

program
    .command('deldic <name>')
    .alias('dd')
    .action(name => deleteDic(name));

// Create a vocabulary list
program
    .command('newvocab')
    .alias('nv')
    .action(() => {
        prompt(vocabQuestions).then(answers => newVocab(answers));
    });

// remove a vocabulary list
program
    .command('removevocab')
    .alias('rv')
    .action(() => {
        prompt(vocabQuestions).then(answers => removeVocab(answers));
    });;

program.parse(process.argv);
