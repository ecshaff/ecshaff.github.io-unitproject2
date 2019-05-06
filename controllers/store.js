let express = require('express')
let router = express.Router()

router.get('/', function(req, res) {
	Store.find({}, function(error, store){
		if (error){ console.log(error) }
	res.render('./store/index.ejs', {store})
})
	})

router.post ( '/' , function(req, res) {
  Store.create( req.body , function(error, store) {
    if (error) { res.send (error) ; } else {
      res.redirect( '/store/'+ store.id );
    }
  });
});

router.get('/new', function(req, res){
	res.render('./store/new.ejs')
})

router.put( '/:id' , function(req, res) {
  Store.findByIdAndUpdate( req.params.id, req.body , { new : true }, function(error, product)  {
    if (error) { console.log(error); }
    res.redirect ( '/store/' + store.id );
  });
});

module.exports = router;