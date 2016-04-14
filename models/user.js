var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    ext: {
        website: String,
        contributions: [{
            page: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Page'
            },
            revision: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Text'
            }
        }]
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('User', userSchema);