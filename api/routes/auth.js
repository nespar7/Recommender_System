const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Create User
router.post("/create", async (req, res) => {
	console.log(req.body);
	try {
		const salt = await bcrypt.genSalt(7);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Search for existing user
		const search = await User.findOne({ username: req.body.username });

		if (search) {
			res.status(409).send("Username already exists");
		}

		const newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			username: req.body.username,
			password: hashedPassword,
		});

		const saveUser = await newUser.save();
		res.status(200).json(saveUser);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e });
	}
});

// Login User
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			res.status(404).send("User not found");
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword) {
			res.status(401).send("Invalid password");
		} else {
			res.status(200).json(user);
		}
	} catch (e) {
		res.status(500).json({ message: e });
	}
});

module.exports = router;
