const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	price: Number,
	productImage: String,
	description: String,
	tags: [String],
	interactions: {
		type: Number,
		default: 0,
	},
	reviewScore: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Product", productSchema);
