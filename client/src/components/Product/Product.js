import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";
import "./product.css";

function Product({ currentProduct }) {
	const { user } = useContext(AuthContext);
	console.log(currentProduct);

	const purchaseHandler = async (e) => {
		e.preventDefault();
		// Check if the user is logged in
		if (user) {
			// Make a call to the backend to purchase the product
			try {
				// const product = await axios.get(`/api/product/${currentProduct._id}`);
				console.log("product", currentProduct);
				const tags = currentProduct.tags;
				console.log("tags", tags);
				await axios.put(`/api/user/${user._id}`, {
					product: currentProduct,
					tags: tags,
					type: "purchase",
				});
				console.log("purchase successful");
				// Reload the page
				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		} else {
			// Redirect the user to home page
			Navigate("/login");
		}
	};

	return (
		<div className="product">
			{/* First div for an image */}
			<div className="productImage">
				<img
					src={currentProduct.imageLink}
					alt="noImageAvailable"
					className="productImg"
				/>
			</div>
			<div className="title">{`${currentProduct.name}`}</div>
			<div className="price">{`price: ${currentProduct.price}`}</div>
			<div className="tags">
				{/* concatenate each tag in currentProduct.tags as a space seperated string */}
				{currentProduct.tags.join(" ")}
			</div>
			<div className="purchaseButton" onClick={purchaseHandler}>
				Purchase
			</div>
		</div>
	);
}

export default Product;
