var express = require('express');
var session = require('express-session')
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
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// passport configuration
require('./config/auth.js')(passport);
app.use(session({ secret: 'securedsession' }));
app.use(passport.initialize()); // necessary for express based apps
app.use(passport.session()); // passport session middleware

// set routes handler
require('./app/routes.js')(app, passport);

app.listen(port);
console.log("App listening on port " + port);
