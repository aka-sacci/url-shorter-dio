import { Schema } from 'mongoose';

const shortenedURLsSchema = new Schema({
    hash: {
        type: String,
        require: true
    },
    originURL: {
        type: String,
        require: true
    }
})

module.exports = shortenedURLsSchema;