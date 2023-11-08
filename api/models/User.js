const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: String,
	password: String,
	interactions: [
		{
			tag: String,
			score: {
				type: Number,
				default: 0,
			},
		},
	],
});

module.exports = mongoose.model("User", userSchema);
