var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	itemText: String,
	itemChecked: Boolean
});

module.exports = mongoose.model('item', itemSchema);

