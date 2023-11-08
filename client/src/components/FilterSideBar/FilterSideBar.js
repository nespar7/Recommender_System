import React from "react";
import "./FilterSideBar.css";
// import { Button } from "react-bootstrap";
import { useState } from "react";

const filters = [
	"Explore",
	"Plugins",
	"FigJam",
	"Design systems",
	"Wireframes",
	"Illustrations",
	"Icons",
	"Typography",
	"Mobile design",
	"Web design",
	"UI kits",
];

function FilterSideBar() {
	const [selectedFilter, setSelectedFilter] = useState(filters[0]);

	return (
		<div className="sidebar">
			{filters.map((filter) => (
				<button
					key={filter}
					className={`filter-button ${
						filter === selectedFilter ? "selected" : ""
					}`}
					onClick={() => setSelectedFilter(filter)}
				>
					{filter}
				</button>
			))}
		</div>
	);
}

export default FilterSideBar;
