const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Product = require("../models/Product");

// array
const interactionTags = [
	"topwear",
	"bottomwear",
	"footwear",
	"tshirt",
	"shirt",
	"polo",
	"sweatshirt",
	"hoodies",
	"trousers",
	"jeans",
	"shorts",
	"boxers",
	"formals",
	"trackpants",
	"formal",
	"sports",
	"sneakers",
	"socks",
	"sandals",
	"belted",
	"red",
	"green",
	"yellow",
	"blue",
	"black",
	"purple",
	"orange",
	"cyan",
	"white",
	"lilac",
	"lavender",
	"cotton",
	"wool",
	"synthetic",
	"denim",
	"leather",
	"silk",
	"vest",
	"pajamas",
	"studs",
];

router.put("/:id", async (req, res) => {
	const { productId, type } = req.body;

	try {
		if (type !== "purchase" && type !== "view") {
			res.status(400).send("Invalid type");
		}
		const product = await Product.findById(productId);
		const tags = product.tags;

		const user = await User.findById(req.params.id);
		// get the users interactions array
		console.log(user);
		tags.map((tag) => {
			// If no json object with object.tag === interaction.tag exists, create one in the user interactions array
			if (
				!user.interactions.find((obj) => {
					return obj.tag === tag;
				})
			) {
				user.interactions.push({ tag: tag, score: 0 });
			}
		});

		const interactions = user.interactions;
		// create a map between interaction tag and score that uses the interactions array
		const reqInteractions = new Map();
		interactions.forEach((interaction) => {
			reqInteractions.set(interaction.tag, interaction.score);
		});
		// For tags in interactionTags and not in reqInteractions, set score to 0
		interactionTags.forEach((tag) => {
			if (!reqInteractions.has(tag)) {
				reqInteractions.set(tag, 0);
			}
		});

		// For each tag in tags, increment req
		tags.forEach((tag) => {
			reqInteractions.set(
				tag,
				reqInteractions.get(tag) + (type === "purchase" ? 5 : 2)
			);
		});
		// for tags in interactionTags and not in tags, divide score by 1.25
		interactionTags.forEach((tag) => {
			if (!tags.includes(tag)) {
				const currScore = reqInteractions.get(tag);
				reqInteractions.set(tag, currScore < 0.1 ? 0 : currScore);
			}
		});

		// Normalize the reqInteractions such that maximum score is 5
		const max = Math.max(...reqInteractions.values());
		reqInteractions.forEach((value, key) => {
			reqInteractions.set(key, value * (5 / max));
		});

		// Create an array from reqInteractions that follows the key order of interactionTags
		const reqInteractionsArray = [];
		interactionTags.forEach((tag) => {
			reqInteractionsArray.push(reqInteractions.get(tag));
		});

		// update user interactions with the mostRelevantTags array and set the interactions array to have tags with non-zero scores
		user.interactions = [];
		interactionTags.forEach((tag) => {
			const score = reqInteractions.get(tag);
			if (score !== 0) {
				user.interactions.push({
					tag: tag,
					score: score,
				});
			}
		});

		// scores is an array with 40 random numbers between 0 and 5
		let scores = Array(40).fill(0);
		// Get response from model
		// scores = model(reqInteractionsArray);

		// Update user mostRelevantTags array such that the tag in interactionTags with the highest score in the scores array is at the top
		// The indices of the scores array correspond to the indices of the interactionTags array
		const mostRelevantTags = [];
		interactionTags.forEach((tag, index) => {
			mostRelevantTags.push({ tag: tag, score: scores[index] });
		});
		mostRelevantTags.sort((a, b) => b.score - a.score);
		// user.mostRelevantTags = 5 tags from mostRelevantTags array after removing the score property;
		user.mostRelevantTags = mostRelevantTags.slice(0, 5).map((tag) => tag.tag);

		// Update product interactions
		product.interactions += type === "purchase" ? 3 : 1;
		console.log(reqInteractions);

		const updatedUser = await user.save();
		res.status(200).json(updatedUser);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e });
	}
});

module.exports = router;
