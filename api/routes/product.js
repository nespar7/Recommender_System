const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// add product
router.post("/", async (req, res) => {
	// search for existing product

	const newProduct = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.body.productImage,
		description: req.body.description,
		tags: req.body.tags,
		imageLink: req.body.imageLink,
		reviewScore: req.body.review,
	});

	try {
		const product = await Product.findOne({ name: req.body.name });

		if (product) {
			res.status(409).send("Product already exists");
		}

		const savedProduct = await newProduct.save();
		console.log("something added");
		res.status(201).json(savedProduct);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// update product by id
router.put("/:id", async (req, res) => {
	const currentProduct = await Product.findById(req.params.id);
	const score = req.body.reviewScore;
	currentProduct.reviewScore =
		currentProduct.reviewScore * currentProduct.reviews + score;
	currentProduct.reviews += 1;
	currentProduct.reviewScore =
		currentProduct.reviewScore / currentProduct.reviews;

	await currentProduct.updateOne({ $set: req.body });
	res.status(200).json({ message: "product updated" });
});

// get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		const userId = req.body.userId;
		const user = User.findById(userId);
		let searchTags = user.mostRelevantTags;
		if (!searchTags) {
			searchTags = [];
		}
		// append userTags to searchTags

		let productArray = [];

		// loop through products and find number of matching tags
		products.forEach((product) => {
			let matches = 0;
			product.tags.forEach((tag) => {
				if (searchTags.includes(tag)) {
					matches += 1;
				}
			});
			productArray.push({ product: product, matches: matches });
		});

		// sort by number of matches
		productArray.sort((a, b) => {
			if (b.matches === a.matches) {
				return b.product.reviewScore - a.product.reviewScore;
			}
			return b.matches - a.matches;
		});

		productArray = productArray
			.map((product) => {
				console.log(product.product);
				return product.product;
			})
			.slice(0, 20);

		// console.log(productArray);
		// send first 20 products
		res.status(200).json(productArray);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
});

// on receiving the tags array, sort it by number of tag matches and then by review score
router.get("/search", async (req, res) => {
	try {
		const products = await Product.find();
		const searchTags = req.body.tags;
		const userId = req.body.userId;
		const user = User.findById(userId);
		const userTags = user.mostRelevantTags;
		// append userTags to searchTags
		userTags.forEach((tag) => {
			if (!searchTags.includes(tag)) {
				searchTags.push(tag);
			}
		});
		let productArray = [];

		// loop through products and find number of matching tags
		products.forEach((product) => {
			let matches = 0;
			// for each search tag, check if it is in the product tags
			searchTags.forEach((tag) => {
				// if it is, increment matches
				if (product.tags.includes(tag)) {
					matches += 1;
				}
			});
			productArray.push({ product: product, matches: matches });
		});

		// sort by number of matches
		productArray.sort((a, b) => {
			if (b.matches === a.matches) {
				return b.product.reviewScore - a.product.reviewScore;
			}
			return b.matches - a.matches;
		});

		// console.log(productArray);
		// send first 20 products
		res.status(200).json(
			productArray
				.map((product) => {
					console.log(product.product);
					return product.product;
				})
				.slice(0, 20)
		);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// get product by id
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// export
module.exports = router;
