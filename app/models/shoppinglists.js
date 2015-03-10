var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// fixme:
// see http://mongoosejs.com/docs/populate.html
// and https://stackoverflow.com/questions/11912127/
// understanding-relationships-foreign-keys-in-mongoose

var shoppinglistSchema = new mongoose.Schema({
	name: String,
	items: [{
		name: String
	}],
	members: [{
		member: String
	}]
});

module.exports = mongoose.model('shoppinglist', shoppinglistSchema);
