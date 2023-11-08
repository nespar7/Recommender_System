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
			const products = await axios.get("/api/product", user._id);
			setProducts(products["data"]);
		};

		fetchProducts();
	}, [user]);

	return (
		<>
			<Topbar />
			<div className="homeContainer">
				<div className="filterSideBar">
					<FilterSideBar />
				</div>
				<div className="productsListing">
					<ProductsList products={products} />
				</div>
			</div>
		</>
	);
}
