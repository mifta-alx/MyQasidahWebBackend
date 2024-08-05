const mongoose = require('mongoose')
const User = mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String,
    },
    password:{
        type : String
    },
    role:{
        type: String,
    },
    refresh_token : {
        type: String,
    }
},{timestamps : true})
module.exports = mongoose.model('Users', User)