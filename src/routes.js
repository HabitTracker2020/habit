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
import Index from "views/Index.jsx";
import Profile from "views/Profile.jsx";
import Login from "views/Login.jsx";

var routes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		component: Index,
		layout: "/main"
	},

	{
		path: "/user-profile",
		name: "User Profile",
		icon: "ni ni-single-02 text-yellow",
		component: Profile,
		layout: "/main"
	},

	{
		path: "/login",
		name: "Login",
		icon: "ni ni-key-25 text-info",
		component: Login,
		layout: "/auth"
	}
];
export default routes;
