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
import {
	Card,
	CardBody,
	CardTitle,
	Container,
	Row,
	Col,
	Progress
} from "reactstrap";
import GlobalContext from "context/Global";
import { db } from "firebase.js";

class Header extends React.Component {
	static contextType = GlobalContext;
	state = {};

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
				<div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
					{/* Mask */}
					<span className="mask bg-gradient-info opacity-8" />
					<Container fluid>
						<div className="header-body">
							{/* Card stats */}
							<Row className="justify-content-center">
								<Col lg="6" xl="4">
									{this.context.isLogged ? (
										<Card className="card-stats bg-default mb-4 mb-xl-0">
											<CardBody>
												<Row>
													<Col>
														<div className="progress-info">
															<span className="text-danger">
																<i className="ni ni-favourite-28 mr-2"></i>
																Health
															</span>
															<div className="progress-percentage">
																<span>
																	{this.context.user.stats
																		? this.context.user.stats.health
																		: 0}{" "}
																	/ 100
																</span>
															</div>
														</div>
														<div>
															<Progress
																tag="div"
																max="100"
																value={
																	this.context.user.stats
																		? this.context.user.stats.health
																		: 0
																}
																color="danger"
															/>
														</div>
													</Col>
												</Row>
											</CardBody>
										</Card>
									) : null}
								</Col>
								<Col lg="6" xl="4">
									{this.context.isLogged ? (
										<Card className="card-stats bg-default mb-4 mb-xl-0">
											<CardBody>
												<Row
													style={{ paddingBottom: "1.6px" }}
													className="justify-content-center"
												>
													<Col className="col-auto">
														<span className="avatar avatar-md rounded-circle">
															<img alt="..." src={this.context.user.photoURL} />
														</span>
													</Col>
													<Col>
														<CardTitle
															tag="h5"
															className="text-uppercase text-light text-muted mb-0"
														>
															{this.context.user.displayName}
														</CardTitle>
														<CardTitle
															tag="h5"
															className="text-uppercase text-light text-muted mb-0 mt-1"
														>
															Level{" "}
															<span className="h2 text-light font-weight-bold mb-0">
																{this.context.user.stats
																	? this.context.user.stats.level
																	: 0}
															</span>
														</CardTitle>
													</Col>
												</Row>
											</CardBody>
										</Card>
									) : null}
								</Col>
								<Col lg="6" xl="4">
									{this.context.isLogged ? (
										<Card className="card-stats bg-default mb-4 mb-xl-0">
											<CardBody>
												<Row>
													<Col>
														<div className="progress-info">
															<span className="text-warning">
																<i className="ni ni-diamond mr-2"></i>
																Diamonds
															</span>
															<div className="progress-percentage">
																<span>
																	{this.context.user.stats
																		? this.context.user.stats.diamonds
																		: 0}{" "}
																	/ 500
																</span>
															</div>
														</div>
														<div>
															<Progress
																tag="div"
																max="500"
																value={
																	this.context.user.stats
																		? this.context.user.stats.diamonds
																		: 0
																}
																color="warning"
															/>
														</div>
													</Col>
												</Row>
											</CardBody>
										</Card>
									) : null}
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
