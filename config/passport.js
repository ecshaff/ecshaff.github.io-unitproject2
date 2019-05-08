let passport = require('passport')
let User = require('../models/user')
let LocalStrategy = require('passport-local').Strategy
let validator =require('express-validator')

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	User.findById(id, function(error, user){
		done(error, user)
	})
})

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, 
	function(req, email, password, done){
		req.checkBody('email', 'Invalid email').notEmpty().isEmail()
		req.checkBody('password', 'Invalid password').notEmpty().isLength({min:5})
		let errors = req.validationErrors()
		if (errors) {
			let messages = []
			errors.forEach(function(error){
				messages.push(error.msg)
			})
			return done(null, false, req.flash('error', messages))
		}
		User.findOne({'email': email}, function(error, user){
			if (error){
				return done(error)
			}
			if (user) {
				return done(null, false, {message: 'Email already in use.'})
			}
			let newUser = new User()
			newUser.email = email
			newUser.password = newUser.encryptPassword(password)
			newUser.save(function(error, result){
				if (error){
					return done(error)
				}
				return done(null, newUser)
			})
		})
	}))