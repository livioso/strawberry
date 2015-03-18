var LocalStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
  'use strict';

  passport.use(new LocalStrategy(function (username, password, done) {
    if (username === process.env.DEVUSERNAME &&
        password === process.env.DEVUSERPW) {
      return done(null, {name: 'DEVUSER'});
    } else {
      return done(null, false, {message: 'Incorrect username.'});
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
