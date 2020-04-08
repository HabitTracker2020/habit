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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GlobalState from "./context/GlobalState";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import MainLayout from "./layouts/Main.jsx";
import AuthLayout from "./layouts/Auth.jsx";

ReactDOM.render(
	<GlobalState>
		<BrowserRouter>
			<Switch>
				<Route path="/main" render={(props) => <MainLayout {...props} />} />
				<Route path="/auth" render={(props) => <AuthLayout {...props} />} />
				<Redirect from="/" to="/main/dashboard" />
			</Switch>
		</BrowserRouter>
	</GlobalState>,
	document.getElementById("root")
);
