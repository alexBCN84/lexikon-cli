const mongoose = require('mongoose');

// Vocabulary list Schema
const entrySchema = mongoose.Schema({
    source: { type: String },
    target: { type: String }
});

// Define and export 
module.exports = mongoose.model('Entry', entrySchema);