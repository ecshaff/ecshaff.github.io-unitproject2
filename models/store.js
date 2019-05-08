let mongoose = require('mongoose')
let Schema = mongoose.Schema
let storeSchema = new Schema({

img : String,

name : String,

description : String,

price : { type: Number, min :[0]},

about : String,

qty : { type: Number, min :[0] }

})

let Store = mongoose.model('Store', storeSchema)

module.exports = Store