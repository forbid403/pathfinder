const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contestSchema = new Schema({
    site : {type : String, required : true},
    title : {type : String, required : true},
    startTime : {type : Date, required : true},
    duration : {type : String, required : true},
    url : {type : String, required : true, unique : true},
    num : {type : Number, default : 0}
})

module.exports = mongoose.model('contest', contestSchema)