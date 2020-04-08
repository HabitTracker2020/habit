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
import { Container, Row, Col } from "reactstrap";

import Header from "../components/Headers/Header.jsx";
import { HabitCard, TodoCard, RewardCard } from "../components/Cards";
import AuthContext from "../context/Global";

class Index extends React.Component {
	static contextType = AuthContext;

	render() {
		return (
			<>
				{this.context.isLogged ? <Header /> : null}
				{/* Page content */}

				<Container className="mt--7 mb-5" fluid>
					{this.context.isLogged ? (
						<Row>
							<Col className="order-xl-1 mb-5 mb-md-0" md="4">
								<HabitCard />
							</Col>
							<Col className="order-xl-2 mb-5 mb-md-0" md="4">
								<TodoCard />
							</Col>
							<Col className="order-xl-2 mb-5 mb-md-0" md="4">
								<RewardCard />
							</Col>
						</Row>
					) : null}
				</Container>
			</>
		);
	}
}

export default Index;
