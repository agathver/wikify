var mongoose = require('mongoose');
var config = require('../config');

var pageSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        required: true
    },
    protection: [{
        type: String,
        enum: config.protection.levels,
        default: config.protection.default
    }],
    text: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Text',
        required: true
    },
    revisions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Text'
    }],
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Page', pageSchema);