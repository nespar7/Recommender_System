import React from "react";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./login.css";
import { useNavigate } from "react-router";

function Login() {
	const username = useRef();
	const password = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);
	const nav = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		loginCall(
			{ username: username.current.value, password: password.current.value },
			dispatch
		);
	};

	const redirectToReg = () => {
		nav("/register");
	};

	return (
		<div className="loginDiv">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Login</h3>
					<span className="loginDesc">Welcome</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleSubmit}>
						<input
							type="text"
							className="loginInput"
							placeholder="Username"
							required
							ref={username}
						/>
						<input
							type="password"
							className="loginInput"
							placeholder="Password"
							required
							minLength="6"
							ref={password}
						/>
						{/* A field for showing the error if there is any */}
						{error && <span className="loginError">{error}</span>}
						<button className="loginButton" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="secondary" size="20px" />
							) : (
								"Log In"
							)}
						</button>
						<span className="registerText" onClick={redirectToReg}>
							New User? Register
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
