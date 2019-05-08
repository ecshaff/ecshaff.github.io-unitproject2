let express = require('express')
let bodyParser = require ( 'body-parser' );
let mongoose = require('mongoose')
require('dotenv').config()
let app = express()
let Store = require('./models/store')
let Home = require('./models/home')
let methodOverride = require('method-override')
let csrf = require('csurf')
let csrfProtection = csrf()
let session = require('express-session')
let passport = require('passport')
let flash = require('connect-flash')
let validator =require('express-validator')

let PORT = process.env.PORT
let mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})
require('./config/passport')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(validator())
app.use( bodyParser.json() );
app.use( express.static ( 'public' ) );
app.use(session({secret:'mysecret', resave: false, saveUninitialized: false}))
app.use(csrfProtection)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(csrf());
app.use(function (req, res, next) {
res.cookie('XSRF-TOKEN', req.csrfToken());
res.locals.csrftoken = req.csrfToken();
next();
});

app.get('/store/new', function(req, res){
	res.render('./store/new.ejs')
})


app.get('/home/new', function(req, res){
	res.render('./homepage/new.ejs')
})

app.get('/store/', function(req, res){
	Store.find({}, function(error, allStore){
		res.render('./store/index.ejs', {
			store: allStore
		})
	})
})

app.get('/signup', function(req, res, next){
	let messages = req.flash('error')
	res.render('./user/signup.ejs', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
})

app.get('/signin', function(req, res, next){
	let messages = req.flash('error')
	res.render('./user/signin.ejs', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})

})

app.post('/signup', passport.authenticate('local.signup', {
successRedirect: '/profile',
failureRedirect: '/signup',
failureFlash: true
}))


app.post('/signin', passport.authenticate('local.signin', {
successRedirect: '/profile',
failureRedirect: '/signin',
failureFlash: true
}))

app.get('/profile', function(req, res, next){
	res.render('./user/profile.ejs')

})

app.get('/', function(req, res){
	Store.find({}, function(error, allHome){
		res.render('./homepage/index.ejs', {
			home: allHome
		})
	})
})

app.get('/user/signup', function(req, res, next){
	res.render('./user/signup', {csrfToken: req.csurfToken()})
})


app.get('/home/:id/edit', function(req, res){
	Store.findById(req.params.id, function(error, foundHome){
		res.render('./homepage/edit.ejs', {
			home: foundHome
		})
	})
})

app.put('/home/:id/', function(req, res){
	
	Home.findByIdAndUpdate(req.params.id, req.body, function(error, updatedModel){
		res.redirect('/home')
	})
})

app.post('/home/', function(req, res){
	   Store.create(req.body, function(error, createdHome){
	   	res.redirect('/home')
	   })
})


app.get('/store/:id', function(req, res){
	Store.findById(req.params.id, function(error, foundStore){
		res.render('./store/show.ejs', {
			store: foundStore
		})
	})
})

app.get('/store/:id/edit', function(req, res){
	Store.findById(req.params.id, function(error, foundStore){
		res.render('./store/edit.ejs', {
			store: foundStore
		})
	})
})

app.put('/store/:id/', function(req, res){
	
	Store.findByIdAndUpdate(req.params.id, req.body, function(error, updatedModel){
		res.redirect('/store')
	})
})


app.delete ( 'store/:id' , function( req , res ) {
  Store.findByIdAndRemove( req.params.id , function( error , store) {
    if ( error ) { console.log( error ); }
    res.redirect ( '/store' );
  });
});

app.post('/store/', function(req, res){
	   Store.create(req.body, function(error, createdStore){
	   	res.redirect('/store')
	   })
})







app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

