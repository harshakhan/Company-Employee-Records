const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 265,
    },
    email: {
        type: String,
        required: true,
        max: 265,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1054,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema)