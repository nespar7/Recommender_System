import React, { useState } from "react";
import "./FilterSideBar.css";

const tagGroups = {
	"Set 1 - Categories": ["topwear", "bottomwear", "footwear"],
	"Set 2 - Topwear": [
		"tshirt",
		"shirt",
		"polo",
		"sweatshirt",
		"hoodies",
		"vest",
	],
	"Set 3 - Bottomwear": [
		"trousers",
		"jeans",
		"shorts",
		"boxers",
		"formals",
		"trackpants",
		"pajamas",
	],
	"Set 4 - Shoes": [
		"formal",
		"running",
		"sneakers",
		"socks",
		"sandals",
		"belted",
		"studs",
	],
	"Set 5 - Colors": [
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
	],
	"Set 6 - Materials": [
		"cotton",
		"wool",
		"synthetic",
		"denim",
		"leather",
		"silk",
	],
};

function FilterSideBar({ filterHandler }) {
	const [selectedTags, setSelectedTags] = useState([]);

	// const filterHanlder = props.filterHanlder;

	const handleTagClick = (e, tag) => {
		e.stopPropagation();
		console.log(tag);
		console.log(selectedTags);

		const index = selectedTags.indexOf(tag);
		if (index === -1) {
			setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
		} else {
			setSelectedTags((prevSelectedTags) => [
				...prevSelectedTags.slice(0, index),
				...prevSelectedTags.slice(index + 1),
			]);
		}
	};

	const isSelected = (tag) => {
		const selected = selectedTags.indexOf(tag) !== -1;
		return selected;
	};

	const filterButtonClickHandler = () => {
		filterHandler(selectedTags);
	};

	const filterResetHandler = () => {
		setSelectedTags([]);
		// reload the page
		window.location.reload();
	};

	return (
		<div className="filter">
			<div className="filterButtonHolder">
				<button
					className="filterButton"
					onClick={() => filterButtonClickHandler()}
				>
					Filter
				</button>
				<button className="filterButton" onClick={filterResetHandler}>
					Reset Filters
				</button>
			</div>
			<div className="sidebar">
				{Object.entries(tagGroups).map(([groupName, tags]) => (
					<div key={groupName} className="tag-group">
						<h3 className="group-name">{groupName}</h3>
						{tags.map((tag) => (
							<button
								key={tag}
								className={`tag ${isSelected(tag) ? "selected" : ""}`}
								onClick={(e) => handleTagClick(e, tag)}
							>
								{tag}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default FilterSideBar;
