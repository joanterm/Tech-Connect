const mongoose = require("mongoose")

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    social: {
        type: String,
        unique: true
    }
}, {timestamps: true})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users