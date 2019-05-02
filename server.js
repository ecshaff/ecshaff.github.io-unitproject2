const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()


const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI


app.use(express.urlencoded({ extended: false }))


app.get('/new', function(req, res){
	res.render('./store/new.ejs')
})

mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

app.listen(PORT, () => console.log('auth happening on port', PORT))

