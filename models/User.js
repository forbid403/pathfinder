const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id : {type : String, required : true, unique : true},
    name : {type : String, required : true},
    provider : {type : String, required : true},
    star : {type : Array},
    thumbsUp : {type : Array}
})

module.exports = mongoose.model('user', userSchema)