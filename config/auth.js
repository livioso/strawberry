var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

	passport.use(new LocalStrategy(
		function(username, password, done) {

			if (username === "livio" && password === "livio") {
				return done(null, {name: "Livio"});
			}

			if (username === "maria" && password === "maria") {
				return done(null, {name: "Maria"});
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
