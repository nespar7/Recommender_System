import React from "react";
import { logoutCall } from "../../apiCalls";
import "./topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
	const { user, dispatch } = useContext(AuthContext);

	return (
		<>
			<div className="topbarContainer">
				<div className="topbarLeft">
					<Link to="/" style={{ textDecoration: "none" }}>
						<span className="logo">PNTU</span>
					</Link>
				</div>
				<div className="topbarMiddle">Hello {user.username}</div>
				<div className="topbarRight">
					<div
						className="logout"
						onClick={() => {
							// call logout function
							logoutCall(dispatch);
						}}
					>
						Logout
					</div>
				</div>
			</div>
		</>
	);
}
