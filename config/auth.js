var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/users');

module.exports = function (passport) {
  'use strict';

  passport.use(new LocalStrategy(function (username, password, done) {
    if (username === process.env.DEVUSERNAME &&
        password === process.env.DEVUSERPW) {
      // todo: livio 31.05.2015: Remove me ;-)
      // just for demonstration purposes we already
      // have Alex in our Database (incl. his Facebook
      // profile ID).
      User.findOrCreate({
        givenName: 'Alexandre',
        familyName: 'De Spindler',
        profileId: '594587729'
      }, function(err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
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
        //'http://localhost:8080/' +
        'https://strawberry-livioso.herokuapp.com/' +
        'auth/facebook/callback'
    },

    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOrCreate({
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        profileId: profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        } else {
          done(null, user);
        }
      });
    }
  ));
};
