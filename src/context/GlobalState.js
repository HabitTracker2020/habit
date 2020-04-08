import React, { Component } from "react";
import { auth, GoogleProvider, GithubProvider, db } from "../firebase.js";
import GlobalContext from "./Global";

class GlobalState extends Component {
	state = {
		user: null,
		isLogged: false,
		authInProcess: true,
	};

	updateUserStats = (stats) => {
		this.setState({
			user: { ...this.state.user, stats },
		});
	};

	googleLogin = () => {
		auth.signInWithPopup(GoogleProvider).then(this.afterLogin);
	};

	githubLogin = () => {
		auth
			.signInWithPopup(GithubProvider)
			.then(this.afterLogin)
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;

				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				// var credential = error.credential;
				console.log(errorCode, errorMessage, email);
				// ...
			});
	};

	passLogin = (email, password, signup = false) => {
		if (signup) {
			return auth
				.createUserWithEmailAndPassword(email, password)
				.then(this.afterLogin)
				.catch(function (error) {
					// Handle Errors here.
					console.log(error);
					return { success: false, error };
				});
		}
		return auth
			.signInWithEmailAndPassword(email, password)
			.then(this.afterLogin)
			.catch(function (error) {
				// Handle Errors here.
				console.log(error);
				return { success: false, error };
			});
	};

	afterLogin = (result) => {
		const defaultStats = {
			diamonds: 50,
			health: 100,
			level: 1,
			userId: result.user.uid,
		};
		const user = {
			...result.user,
			stats: defaultStats,
		};
		if (result.additionalUserInfo.isNewUser) {
			db.collection("stats").add(defaultStats);
		}
		this.setState({
			user,
			isLogged: user !== null,
			authInProcess: false,
		});
		return { success: true };
	};

	onAuthChange = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user, isLogged: true, authInProcess: false });
			} else {
				this.setState({ user: null, isLogged: false, authInProcess: false });
			}
		});
	};

	logout = (e) => {
		e.preventDefault();
		auth.signOut().then(() => {
			this.setState({
				user: null,
				isLogged: false,
			});
		});
	};

	render() {
		return (
			<GlobalContext.Provider
				value={{
					user: this.state.user,
					isLogged: this.state.isLogged,
					authInProcess: this.state.authInProcess,
					googleLogin: this.googleLogin,
					githubLogin: this.githubLogin,
					passLogin: this.passLogin,
					onAuthChange: this.onAuthChange,
					logout: this.logout,
					updateUserStats: this.updateUserStats,
				}}
			>
				{this.props.children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalState;
