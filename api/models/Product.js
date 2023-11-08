const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	price: Number,
	productImage: String,
	description: String,
	tags: [String],
	// A float review score between 1 and 5(inclusive)
	reviewScore: {
		type: Number,
		default: 0,
	},
	reviews: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Product", productSchema);
