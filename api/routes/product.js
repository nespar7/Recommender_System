const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// add product
router.post("/", async (req, res) => {
	const newProduct = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.body.productImage,
		description: req.body.description,
		tags: req.body.tags,
	});

	try {
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
	currentProduct.reviewScore = currentProduct.reviewScore * currentProduct.reviews + score;
	currentProduct.reviews += 1;
	currentProduct.reviewScore = currentProduct.reviewScore / currentProduct.reviews;

	await currentProduct.updateOne({ $set: req.body });
	res.status(200).json({ message: "product updated" });
});

// get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// get product by tag
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
