const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
	const { tags, type } = req.body;

	try {
		const user = await User.findById(req.params.id);

		if (type === "view") {
			user.interactions = user.interactions.map((interaction) => {
				if (interaction.tag in tags) {
					interaction.score += 1;
				}
				return interaction;
			});
		} else if (type === "purchase") {
			user.interactions = user.interactions.map((interaction) => {
				if (interaction.tag in tags) {
					interaction.score += 4;
				}
				return interaction;
			});
		} else {
			res.status(400).send("Invalid type");
		}

		const updatedUser = await user.save();
		res.status(200).json(updatedUser);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e });
	}
});

// router.get("/", async());

router.get("/recommendations", async (req, res) => {});

module.exports = router;
