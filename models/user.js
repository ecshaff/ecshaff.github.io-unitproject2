let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')
let userSchema = new Schema({

email : {type: String, required: true},

password : {type: String, required: true}

})

userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password)
}

let User = mongoose.model('User', userSchema)

module.exports = User