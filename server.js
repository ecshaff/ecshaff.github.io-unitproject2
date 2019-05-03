const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
let Store = require('./models/store.js')

const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI


app.use(express.urlencoded({ extended: false }))


app.get('/new', function(req, res){
	res.render('./store/new.ejs')
})

app.get('/', function(req, res) {
	Store.find({}, function(error, store){
		if (error){ console.log(error) }
	res.render('./store/index.ejs', {store})
})
	})

app.post ( '/' , function(req, res) {
  Store.create( req.body , function(error, store) {
    if (error) { res.send (error) ; } else {
      res.redirect( '/store/'+ store.id );
    }
  });
});


app.put( '/:id' , function(req, res) {
  Store.findByIdAndUpdate( req.params.id, req.body , { new : true }, function(error, product)  {
    if (error) { console.log(error); }
    res.redirect ( '/store/' + store.id );
  });
});


mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

app.listen(PORT, () => console.log('auth happening on port', PORT))

