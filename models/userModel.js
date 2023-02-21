const mongoose = require('mongoose')
const validator = require("mongoose-unique-validator");


const userSchema = new mongoose.Schema({

    Firstname: {
        type: String,
        required: true,
        trim: true,
    },
    Lastname: {
        type: String,
        required: true,
        trim: true

    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    is_admin: {
        type: Number,
        required: true,
        trim: true
    },
    is_varified: {
        type: Number,
        default: 0
    }
})

userSchema.plugin(validator)
module.exports = mongoose.model('User', userSchema)