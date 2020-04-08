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
import GlobalContext from "../context/Global";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import classnames from "classnames";

class Login extends React.Component {
	static contextType = GlobalContext;

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	state = {
		email: "",
		password: "",
		error: false,
		signup: false,
	};

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleLogin(event) {
		event.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		if (email === "" || password === "") {
			this.setState({ error: "Email and Password is required" });
		} else {
			this.context
				.passLogin(email, password, this.state.signup)
				.then((result) => {
					if (!result.success) {
						let msg;
						switch (result.error.code) {
							case "auth/user-not-found":
								msg = "Email is not registered";
								break;
							case "auth/weak-password":
								msg = "Please use strong password";
								break;
							case "auth/invalid-email":
								msg = "Invalid email address";
								break;
							case "auth/wrong-password":
								msg = "Incorrect Password";
								break;
							default:
								msg = "Unknown error";
								break;
						}
						this.setState({ error: msg });
					}
				});
		}
	}

	render() {
		return (
			<>
				<Col lg="5" md="7">
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-5">
							<div className="text-muted text-center mt-2 mb-3">
								<small>Sign in with</small>
							</div>
							<div className="btn-wrapper text-center">
								<Button
									className="btn-neutral btn-icon"
									color="default"
									href="#pablo"
									onClick={(e) => {
										e.preventDefault();
										this.context.githubLogin();
									}}
								>
									<span className="btn-inner--icon">
										<img
											alt="..."
											src={require("../assets/img/icons/common/github.svg")}
										/>
									</span>
									<span className="btn-inner--text">Github</span>
								</Button>
								<Button
									className="btn-neutral btn-icon"
									color="default"
									href="#pablo"
									onClick={(e) => {
										e.preventDefault();
										this.context.googleLogin();
									}}
								>
									<span className="btn-inner--icon">
										<img
											alt="..."
											src={require("../assets/img/icons/common/google.svg")}
										/>
									</span>
									<span className="btn-inner--text">Google</span>
								</Button>
							</div>
						</CardHeader>
						<CardBody className="px-lg-5 py-lg-5">
							<div
								className={classnames("text-center", "mb-4", {
									"text-warning": !!this.state.error,
									"text-muted": !this.state.error,
								})}
							>
								<small>
									{this.state.error ||
										(this.state.signup
											? "Or sign up with credentials"
											: "Or sign in with credentials")}
								</small>
							</div>
							<Form role="form">
								<FormGroup className="mb-3">
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-email-83" />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder="Email"
											onChange={this.handleInputChange}
											value={this.state.email}
											name="email"
											type="email"
											autoComplete="new-email"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<InputGroup className="input-group-alternative">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ni ni-lock-circle-open" />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder="Password"
											onChange={this.handleInputChange}
											value={this.state.password}
											name="password"
											type="password"
											autoComplete="new-password"
										/>
									</InputGroup>
								</FormGroup>
								<div className="custom-control custom-control-alternative custom-checkbox">
									<input
										className="custom-control-input"
										id=" customCheckLogin"
										type="checkbox"
									/>
									<label
										className="custom-control-label"
										htmlFor=" customCheckLogin"
									>
										<span className="text-muted">Remember me</span>
									</label>
								</div>
								<div className="text-center">
									<Button
										className="my-4"
										color="primary"
										type="button"
										onClick={this.handleLogin}
									>
										{this.state.signup ? "Sign up" : "Sign in"}
									</Button>
								</div>
							</Form>
						</CardBody>
					</Card>
					<Row className="mt-3">
						<Col xs="6">
							<a
								className="text-light"
								href="#pablo"
								onClick={(e) => e.preventDefault()}
							>
								<small>Forgot password?</small>
							</a>
						</Col>
						<Col className="text-right" xs="6">
							<a
								className="text-light"
								href="#pablo"
								onClick={(e) => {
									e.preventDefault();
									this.setState({ signup: true });
								}}
							>
								<small>
									{this.state.signup
										? "Already have an account"
										: "Create new account"}
								</small>
							</a>
						</Col>
					</Row>
				</Col>
			</>
		);
	}
}

export default Login;
