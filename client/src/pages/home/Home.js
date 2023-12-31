import React from "react";
import "./Home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/Topbar/Topbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar";

export default function Home() {
	const { user } = useContext(AuthContext);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const products = await axios.get("/api/product", {
				params: {
					userId: user._id,
				},
			});
			setProducts(products["data"]);
		};

		fetchProducts();
	}, [user]);

	const filterHandler = async (filter) => {
		console.log(filter);
		console.log(user._id);

		const tagString = filter.join(" ");

		const products = await axios.get("/api/product/search", {
			params: {
				userId: user._id,
				tags: tagString,
			},
		});

		// post to api/user/:id with tags and type: "view"
		await axios.put(`/api/user/${user._id}`, {
			tags: filter,
			type: "view",
		});

		console.log(products["data"]);
		setProducts(products["data"]);
	};

	return (
		<>
			<Topbar />
			<div className="homeContainer">
				<div className="filterSideBar">
					<FilterSideBar filterHandler={filterHandler} />
				</div>
				<div className="productsListing" id="relevantProducts">
					<ProductsList products={products} message="Products you might like" />
				</div>
			</div>
		</>
	);
}
