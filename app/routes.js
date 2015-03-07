var Todo = require('./models/todo');
var Presets = require('./data/presets');

// middleware function to be used
// for every secured routes
var auth = function(req, res, next) {
	if (!req.isAuthenticated()) {
    res.send(401);
	}
	else {
		next();
	}
};

function getTodos(res) {

	Todo.find(function(err, todos) {

		if (err) {
			res.send(err);
		}

		// return all todos
		res.json(todos);
	});
}


// --- POST / GET ---
module.exports = function(app, passport) {

	// get all todos
	app.get('/api/todos', function(req, res) {

		// from mongo db -> via mongoose
		getTodos(res);
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

	// create todo and send back all todos after creation
	app.post('/api/todos', auth, function(req, res) {

		// create a todo, information comes
		// from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		},
		function(err, todo) {

			if (err) {
				res.send(err);
			}

			getTodos(res);
		});
	});

	app.get('/category', auth, function(req, res) {

		var products = Presets.categories.map(function(item) {
			return item.product;
		});

		res.json(products);
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', auth, function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		},
		function(err, todo) {
			if (err) {
				res.send(err);
			}

			getTodos(res);
		});
	});


	// -- application --
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file
	});
};
