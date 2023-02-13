const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "Title should be atleast 3 chars long!"]
    },
    author: {
        type: String,
        required: true,
        minLength: [5, "Title should be atleast 5 chars long!"]

    },
    image: {
        type: String,
        required: true,
        match:[/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, "Incorrect Image Url!"]
    },
    review: {
        type: String,
        required: true,
        minLength: [10, "Description should be atleast 10 chars long!"]

    },
    genre: {
        type: String,
        required: true,
        minLength: [3, "Title should be atleast 3 chars long!"]

    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    wishingList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Book', BookSchema);
