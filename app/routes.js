var Shoppinglist = require('./models/shoppinglists');
var Item = require('./models/items');
var Presets = require('./data/presets');


// middleware function to be used
// for every secured routes
var auth = function(req, res, next) {
	if (!req.isAuthenticated()) {
    res.sendStatus(401);
	}
	else {
		next();
	}
};


function getShoppinglists(res) {
	Shoppinglist.find(function(err, lists) {

		if (err) {
			res.send(err);
		}

		res.json(lists);
	});
}

function getItems(res) {
	Item.find(function(err, items) {

		if (err) {
			res.send(err);
		}

		res.json(items);
	});
}

// --- POST / GET ---
module.exports = function(app, passport) {

	// get all shoppinglists
	// FIXME see /api/item
	app.get('/api/items', function(req, res) {

		// from mongo db -> via mongoose
		getItems(res);
	});

	app.put('/api/item/:id', function(req, res) {

		Item.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { itemText: req.body.itemText, itemChecked: req.body.itemChecked }}, {upsert: true}, function(err, doc){
				if(err) {
					return res.send(500, { error: err });
				}

			return res.send("succesfully saved");
		});

	});
	// FIXME make me use middleware auth again :-(
	app.post('/api/item', function(req, res) {

		new Item(req.body).save( function ( err, todo, count ){
			if(err) return next( err );
			res.redirect( '/' );
		});
	});


	app.put('/api/list/:id', function(req, res) {

	});

	app.post('/api/list', function(req, res) {

		new Shoppinglist(req.body).save( function ( err, list, count ){
			if(err) return next( err );
			res.redirect( '/' );
		});
	});

	app.get('/api/list', function(req, res) {
		getShoppinglists(res);
	});

	app.get('/loggedin', function(req, res) {
		// fixme: this is a bit hacky
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	app.post('/logout', function(req, res) {

		req.logOut();
		// necessary, otherwise we still
		// look like logged in (why is that?)
		res.sendStatus(404);
	});

	app.get('/category', auth, function(req, res) {

		var products = Presets.categories.map(function(item) {
			return item.product;
		});

		res.json(products);
	});

	// -- application --
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file
	});
};
