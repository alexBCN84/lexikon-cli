const mongoose = require('mongoose');
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
mongoose.connect('mongodb://localhost:27017/lexikoncli', { useNewUrlParser: true });
const db = mongoose.connection;
// Import model

const Entry = require('./models/entry');

// Add Entry
const addEntry = (entry) => {
    Entry.create(entry).then(entry => {
        console.info('New Entry Added');
        db.close();
    });
};
// Find Entry

const findEntry = (word) => {
    // Make case insensitive
    const search = new RegExp(word, 'i');
    Entry.find({ $or: [{ source: search }, { target: search }] })
        .then(entry => {
            console.info(entry);
            console.info(`${entry.length} matches`);
            db.close();
        });
};

// Update entry
const updateEntry = (_id, entry) => {
    Entry.update({ _id }, entry)
        .then(entry => {
            console.info('Entry Updated');
            db.close();
        });
};

// Remove Entry
const removeEntry = (_id) => {
    Entry.remove({ _id })
        .then(entry => {
            console.info('Entry Removed');
            db.close();
        });
};

// List all Entries
const listEntries = () => {
    Entry.find()
        .then(entries => {
            console.info(entries);
            console.info(`${entries.length} words`);
            db.close();
        });
};
// Export All Methods
module.exports = {
    addEntry,
    findEntry,
    updateEntry,
    removeEntry,
    listEntries
};

// the last thing you have to do is create a symlink in order to use your program
// globally from any point in your computer.
// In order to do so, you run npm link. Observe the output below

/*
npm WARN lexikon-cli@1.0.0 No repository field.

up to date in 2.353s
/usr/local/bin/lexikon-cli -> /usr/local/lib/node_modules/lexikon-cli/commands.js
/usr/local/lib/node_modules/lexikon-cli -> /Users/aginesmartin/Documents/voc-builder-cli

*/

// what we've done with npm link is to install pur app as a global dependency