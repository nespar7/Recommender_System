import React from "react";
import Product from "../Product/Product";
import "./productsList.css";

function ProductsList(props) {
	// get the products array from props
	const products = props.products;
	console.log(products);
	const message = props.message;
	console.log(message);

	return (
		<div>
			{message && <div className="message">{message}</div>}
			<div className="products">
				{/* Display the message if exists */}
				{/* map through the products array and render a ProductCard for each product */}
				{products.map((product) => {
					return <Product key={product.name} currentProduct={product} />;
				})}
			</div>
		</div>
	);
}

export default ProductsList;
