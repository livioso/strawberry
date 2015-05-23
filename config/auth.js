var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/users');

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

  passport.use(new FacebookStrategy({
      clientID: process.env.FBAppID,
      clientSecret: process.env.FBAppSecret,
      callbackURL:
        //'https://strawberry-livioso.herokuapp.com/' +
        'http://localhost:8080/' +
        'auth/facebook/callback'
    },

    function(accessToken, refreshToken, profile, done) {

      User.findOrCreate({
        givenName: profile.name.givenName,
        facebookId: profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        } else {
          done(null, user);
        }
      });

      /* TBD: Add user to collection User.
      User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
          done(null, user);
      });
      */

    }
  ));
};
