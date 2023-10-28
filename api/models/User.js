const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: String,
	password: String,
	interactions: [
		{
			tag: String,
			searchScore: {
				type: Number,
				default: 0,
			},
			viewScore: {
				type: Number,
				default: 0,
			},
			clickScore: {
				type: Number,
				default: 0,
			},
		},
	],
});

module.exports = mongoose.model("User", userSchema);
