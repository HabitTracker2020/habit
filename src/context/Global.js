import React from "react";

export default React.createContext({
	user: null,
	isLogged: false,
	googleLogin: e => {},
	logout: e => {},
	updateUserStats: e => {}
});
