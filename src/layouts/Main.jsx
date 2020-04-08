/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";
import routes from "../routes";
import AuthContext from "../context/Global";

class Admin extends React.Component {
	static contextType = AuthContext;

	componentDidUpdate(e) {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		// this.refs.mainContent.scrollTop = 0;
	}

	componentDidMount() {
		this.context.onAuthChange();
	}

	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/main") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	render() {
		return (
			<>
				{this.context.authInProcess === true ? null : this.context.isLogged ? (
					<div className="main-content" ref="mainContent">
						<AuthNavbar />
						<Switch>{this.getRoutes(routes)}</Switch>
					</div>
				) : (
					<Redirect to="/auth/login" />
				)}
			</>
		);
	}
}

export default Admin;
