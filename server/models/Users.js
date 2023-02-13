const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    note: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel