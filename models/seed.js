let Store =('../models/store')
require('dotenv').config()

let mongoose = require('mongoose')
mongoose.connect(mongoURI, { useNewUrlParser: true })


let store = [
	new Store({
	img: "https://i.imgur.com/YMNw2bVm.jpg",
	name: "Emmy Shaffer",
	title:"Swimming",
	description:"10x10 Canvas",
	price: 25
}), 
	new Store({
	img: "https://i.imgur.com/NLynQ99m.jpg",
	name: "Emmy Shaffer",
	title:"Golden Gates",
	description:"10x10 Canvas",
	price: 20


})
]

let done = 0;

for(let i = 0; i < store.length; i++) {
	products[i].save(function(error, result){
		done++
		if(done=== store.length){
			exit()
		}
	});
}
function exit(){
mongoose.disconnect();
}