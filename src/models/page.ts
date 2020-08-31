import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        required: true
    },
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


const Page = mongoose.model('Page', pageSchema);
export default Page;
