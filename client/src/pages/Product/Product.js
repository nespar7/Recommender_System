import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

function Product({ currentProduct }) {
	const { user } = useContext(AuthContext);

	const purchaseHandler = async (e) => {
		e.preventDefault();
		// Check if the user is logged in
		if (user) {
			// Make a call to the backend to purchase the product
			try {
				await axios.put(`/api/user/${user._id}`, {
					tags: currentProduct.tags,
					type: "purchase",
				});
				console.log("purchase successful");
			} catch (error) {
				console.log(error);
			}
		} else {
			// Redirect the user to home page
			Navigate("/login");
		}
	};

	return (
		<>
			{/* First div for an image */}
			<div className="productImage">
				<img
					src={currentProduct.productImage}
					alt="noImageAvailable"
					className="productImg"
				/>
			</div>
			<div className="title">{`${currentProduct.name}`}</div>
			<div className="price">{`${currentProduct.price}`}</div>
			<div className="tags">
				{/* concatenate each tag in currentProduct.tags as a space seperated string */}
				{currentProduct.tags.join(" ")}
			</div>
			<div className="purchaseButton" onClick={purchaseHandler}>
				Purchase
			</div>
		</>
	);
}

export default Product;
