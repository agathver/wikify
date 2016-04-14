var mongoose = require('mongoose');
var textSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['html', 'markdown', 'text'],
        default: 'html'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Text', textSchema);