var express = require('express');
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');

// database configuration
mongoose.connect(database.url);
// app configuration
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// passport configuration
require('./config/auth.js')(passport);

app.use(session({
  secret: 'securedsession',
  saveUninitialized: true,
  resave: true
}));

// necessary for express based apps
app.use(passport.initialize());
app.use(passport.session());

// set routes handler
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('App listening on port ' + port);
