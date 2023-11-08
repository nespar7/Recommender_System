const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
	mostRelevantTags: [String],
});

module.exports = mongoose.model("User", userSchema);
