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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import GlobalContext from "context/Global";
import { db } from "firebase.js";

class Header extends React.Component {
	static contextType = GlobalContext;
	componentDidMount() {
		if (this.context.isLogged) {
			db.collection("stats")
				.where("userId", "==", this.context.user.uid)
				.onSnapshot(
					querySnapshot => {
						if (querySnapshot.docs.length > 0) {
							this.context.updateUserStats({
								...querySnapshot.docs[0].data(),
								id: querySnapshot.docs[0].id
							});
						}
					},
					err => {
						console.log(`Encountered error: ${err}`);
					}
				);
		}
	}
	render() {
		return (
			<>
				<div className="header bg-gradient-info pb-8 pt-5 pt-md-8 py-7 py-lg-8">
					<Container fluid>
						<div className="header-body">
							{/* Card stats */}
							<Row className="justify-content-center">
								<Col lg="6" xl="2">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Health
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{this.context.user.stats
															? this.context.user.stats.health
															: 0}{" "}
														%
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
														<i className="fas fa-heart" />
													</div>
												</Col>
											</Row>
											<p className="mt-3 mb-0 text-muted text-sm">
												<span className="text-danger mr-2">
													<i className="fas fa-arrow-down" /> 3.48%
												</span>{" "}
												<span className="text-nowrap">Since last week</span>
											</p>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="2">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Level
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{this.context.user.stats
															? this.context.user.stats.level
															: 0}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-success text-white rounded-circle shadow">
														<i className="fas fa-level-up-alt" />
													</div>
												</Col>
											</Row>
											<p className="mt-3 mb-0 text-muted text-sm">
												<span className="text-success mr-2">
													<i className="fa fa-arrow-up" /> 1.21%
												</span>{" "}
												<span className="text-nowrap">Since last week</span>
											</p>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="2">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Diamonds
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{this.context.user.stats
															? this.context.user.stats.diamonds
															: 0}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-warning text-white rounded-circle shadow">
														<i className="fas fa-gem" />
													</div>
												</Col>
											</Row>
											<p className="mt-3 mb-0 text-muted text-sm">
												<span className="text-warning mr-2">
													<i className="fas fa-arrow-down" /> 1.10%
												</span>{" "}
												<span className="text-nowrap">Since yesterday</span>
											</p>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Profile
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{this.context.user.displayName.split(" ")[0]}
													</span>
												</div>
												<Col className="col-auto" style={{ height: 48.8 }}>
													<div className="avatar avatar-md rounded-circle shadow">
														<img alt="..." src={this.context.user.photoURL} />
													</div>
												</Col>
											</Row>
											<p className="mt-3 mb-0 text-muted text-sm">
												<span className="text-success mr-2">Homework</span>
												<span className="text-nowrap">Last Activity</span>
											</p>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</>
		);
	}
}

export default Header;
