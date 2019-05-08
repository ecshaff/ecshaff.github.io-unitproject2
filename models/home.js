let mongoose = require('mongoose')
let Schema = mongoose.Schema
let homeSchema = new Schema({

img : String,

title : String,

backgroundImg : String




})

let Home = mongoose.model('Home', homeSchema)

module.exports = Home