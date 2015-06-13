var Shoppinglist = require('./models/shoppinglists');
var User = require('./models/users');
var Presets = require('./data/presets');
var ObjectId = require('mongoose').Types.ObjectId;

// middleware function to be used
// for every secured routes
var auth = function (req, res, next) {
  'use strict';
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
};

// --- POST / GET ---
module.exports = function (app, passport) {
  'use strict';

  // -- /api/list/:idlist/:iditem --
  app.route('/api/list/:idlist/:iditem')
    .get(function (req, res) {
      Shoppinglist.aggregate([
        {$match: {_id: new ObjectId(req.params.idlist)}},
        {$unwind: '$items'},
        {$match: {'items._id': new ObjectId(req.params.iditem)}},
        {$project: {_id: false, item: '$items'}}
      ], function (err, item) {
        if (err) {
          return res.sendStatus(500, {error: err});
        } else {
          return res.json(item);
        }
      });
    })
    .put(function (req, res) {
      var toCheck = req.body.checked;
      Shoppinglist.update({
        _id: new ObjectId(req.params.idlist),
        'items._id': new ObjectId(req.params.iditem)},
        {$set: {'items.$.checked': toCheck}}, function (err) {
        if (err) {
          return res.sendStatus(500, {error: err});
        } else {
          return res.sendStatus(200);
        }
      });
    });

  // -- /api/list --
  app.route('/api/list')
    .put(function (req, res) {
      var list = req.body;
      var creator = {profileId: req.user.profileId};
      var members = [];
      members.push(creator);
      list.members = members;
      new Shoppinglist(list).save(function () {
        return res.send('succesfully saved');
      });
    })
    .get(function (req, res) {
      var requestBy = req.user.profileId;
      Shoppinglist.find({'members': {$elemMatch: {'profileId': requestBy}}},
          function (err, lists) {
        if (err) {
          return res.sendStatus(500, {error: err});
        } else {
          return res.json(lists);
        }
      });
    });

  // -- /api/list/:idlist --
  app.route('/api/list/:idlist')
  .get(function (req, res) {
    Shoppinglist.aggregate([
      {$match: {_id: new ObjectId(req.params.idlist)}}
    ], function (err, lists) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.json(lists);
      }
    });
  })
  .put(function (req, res) {
    Shoppinglist.findOneAndUpdate({_id: req.params.idlist}, {
      $set: {
        name: req.body.name,
        members: req.body.members,
      }
    }, {upsert: true}, function (err) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.send('succesfully saved');
      }
    });
  })
  .post(function (req, res) {
    Shoppinglist.findOneAndUpdate({_id: req.params.idlist}, {
      $addToSet: {items: req.body.items}
    }, {upsert: true}, function (err) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.send('succesfully saved');
      }
    });
  })
  .delete(function (req, res) {
    Shoppinglist.remove({
      _id: req.params.idlist}, function (err) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.sendStatus(200);
      }
    });
  });

  app.route('/api/user')
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        return res.sendStatus(500, {error: err});
      } else {
        return res.json(users);
      }
    });
  });

  app.get('/loggedin', function (req, res) {
    // fixme: this is a bit hacky
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#/main',
      failureRedirect: '/login'
    }));

  app.post('/logout', function (req, res) {
    req.logOut();
    // necessary, otherwise we still
    // look like logged in (why is that?)
    res.sendStatus(404);
  });

  app.get('/category', auth, function (req, res) {
    var products = Presets.categories.map(function (item) {
      return item.product;
    });
    res.json(products);
  });

  // -- application --
  app.get('/', function (req, res) {
    res.sendfile('./public/index.html');  // load the single view file
  });
};
