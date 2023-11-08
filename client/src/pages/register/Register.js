import { useRef } from "react";
import { registerCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./register.css";
import { useNavigate } from "react-router";

function Register() {
	const username = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);
	const nav = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(username.current.value);
		console.log(password.current.value);
		console.log(confirmPassword.current.value);

		// Check if the passwords match

		if (password.current.value === confirmPassword.current.value) {
			registerCall(
				{ username: username.current.value, password: password.current.value },
				dispatch
			);
		} else {
			alert("Passwords do not match");
		}
	};

	const redirectToLogin = () => {
		nav("/login");
	};

	return (
		<div className="registerDiv">
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">Register</h3>
					<span className="registerDesc">Welcome</span>
				</div>
				<div className="registerRight">
					<form onSubmit={handleSubmit} className="registerBox">
						<input
							type="text"
							placeholder="Username"
							required
							className="registerInput"
							ref={username}
						/>
						<input
							type="password"
							placeholder="Password"
							required
							minLength="6"
							className="registerInput"
							ref={password}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							required
							minLength="6"
							className="registerInput"
							ref={confirmPassword}
						/>
						{/* A field for showing the error if there is any */}
						{error && <span className="registerError">{error}</span>}
						<button className="registerButton" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="secondary" size="20px" />
							) : (
								"Register"
							)}
						</button>
						<span className="loginText" onClick={redirectToLogin}>
							Already Registered? Login
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
