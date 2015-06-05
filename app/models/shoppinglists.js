var mongoose = require('mongoose');

// fixme:
// see http://mongoosejs.com/docs/populate.html
// and https://stackoverflow.com/questions/11912127/
// understanding-relationships-foreign-keys-in-mongoose

var shoppinglistSchema = new mongoose.Schema({
  name: String,
  items: [{
    checked: Boolean,
    name: String
  }],
  members: [{
    profileId: String
  }]
});

module.exports = mongoose.model('shoppinglist', shoppinglistSchema);
