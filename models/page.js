var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        required: true
    },
    protection: [{
        type: String,
        enum: ['none', 'semi', 'full', 'root_only', 'immutable'],
        default: 'none'
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