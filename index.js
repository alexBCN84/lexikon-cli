const Entry = require('./models/entry');
const fs = require("fs");
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

// Create a directory 

const createDic = name => {
    console.info(`Going to create dictionary ${name}`);
    fs.mkdir(`dictionaries/${name}`,function(err) {
       if (err) {
          return console.error(err);
       }
       console.info(`Dictionary ${name} created successfully!`);
    });
}

// Delete a dictionary

const deleteDic = name => {
    console.info(`Removing dictionary ${name}`);
    fs.rmdir(`dictionaries/${name}`, err => {
        if (err) {
          return console.error(err);
        }    
   
        fs.readdir("dictionaries/",(err, files) => {
            console.info(`Remaining dictionaries: ${files.length}`);
            if (err) {
                return console.error(err);
            }
            files.forEach(file => {
                console.info(file);
            });
        });
    });
}

// Create vocabulary
const newVocab = answers => {
    console.info("Going to write into existing file");
    fs.writeFile(`dictionaries/${answers.dictionary}/${answers.name}.txt`, 'new vocabulary', err => {
    if (err) {
        return console.error(err);
    }
   
   console.info("Vocabulary created successfully!");
   console.info("Let's read the content of the vocabulary list");
   
   fs.readFile(`dictionaries/${answers.dictionary}/${answers.name}.txt`, (err, data) => {
      if (err) {
         return console.error(err);
      }
      console.info("Asynchronous read: " + data.toString());
   });
});
}

// Delete vocabulary
const removeVocab = answers => {
    console.info("Going to delete an existing file");
    fs.unlink(`dictionaries/${answers.dictionary}/${answers.name}.txt`, err => {
        if (err) {
            return console.error(err);
        }
        console.info("File deleted successfully!");
    });
}

// Export All Methods
module.exports = {
    addEntry,
    findEntry,
    updateEntry,
    removeEntry,
    listEntries,
    createDic,
    deleteDic,
    newVocab,
    removeVocab
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