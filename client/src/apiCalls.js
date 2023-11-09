import axios from "axios";

export const loginCall = async (user, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post("api/auth/login", user);

		localStorage.setItem("user", JSON.stringify(res.data));

		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
	} catch (e) {
		dispatch({ type: "LOGIN_FAIL", payload: e });
	}
};

export const registerCall = async (user, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post("api/auth/create", user);

		localStorage.setItem("user", JSON.stringify(res.data));

		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
	} catch (e) {
		dispatch({ type: "LOGIN_FAIL", payload: e });
	}
};

export const logoutCall = async (dispatch) => {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("user");
};

export const getProductByIdCall = async (id) => {
	try {
		const res = await axios.get("api/product/" + id);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};
