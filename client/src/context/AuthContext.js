import React from "react";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const userData = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

// set initial state
const INITIAL_STATE = {
	user: userData,
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

// wrapper
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
