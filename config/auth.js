var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

	passport.use(new LocalStrategy(
		function(username, password, done) {

			if (username === "admin" && password === "admin") {
				return done(null, {name: "admin"});
			}

			return done(null, false, { message: 'Incorrect username.' });
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

};
