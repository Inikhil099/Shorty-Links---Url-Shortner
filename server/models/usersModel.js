const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true

    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },

},{timestamps : true})

const Users = mongoose.model('user',userSchema)

module.exports = Users;