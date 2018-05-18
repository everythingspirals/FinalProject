import mongoose from 'mongoose';

class TweetModel extends mongoose.Model { }

const schema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
        maxlength: 500
    },
    from: {
        type: String,
        required: true,
        maxlength: 500
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

schema.loadClass(TweetModel);
const model = mongoose.model('tweet', schema, 'tweet');

export default model;
