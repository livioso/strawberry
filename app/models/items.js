var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new mongoose.Schema({
	itemText: String
});

module.exports = mongoose.model('item', itemSchema);

