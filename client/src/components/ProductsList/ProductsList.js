import React from "react";
import Product from "../Product/Product";
import "./productsList.css";

function ProductsList(props) {
	// get the products array from props
	const products = props.products;
	console.log(products);

	return (
		<div className="products">
			{/* map through the products array and render a ProductCard for each product */}
			{products.map((product) => {
				return <Product currentProduct={product} />;
			})}
		</div>
	);
}

export default ProductsList;
