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
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
// core components
import UserHeader from "../components/Headers/UserHeader.jsx";
import AuthContext from "../context/Global";

class Profile extends React.Component {
  static contextType = AuthContext;
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        {this.context.isLogged ? (
          <Container className="mt--7" fluid>
            <Row>
              <Col md={{ size: 4, offset: 4 }} lg="4">
                <Card className="card-profile shadow bg-default text-light">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={this.context.user.photoURL}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center bg-default border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <div className="text-center mt-md-6">
                      <h3 className="text-light">
                        {this.context.user.displayName}
                      </h3>
                    </div>
                    <Row>
                      <Col>
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">
                              <i className="text-danger fas fa-heart"></i>{" "}
                              {this.context.user.stats
                                ? this.context.user.stats.health
                                : 0}
                            </span>
                            <span className="description">Health</span>
                          </div>
                          <div>
                            <span className="heading">
                              <i className="text-success fas fa-level-up-alt"></i>{" "}
                              {this.context.user.stats
                                ? this.context.user.stats.level
                                : 0}
                            </span>
                            <span className="description">Level</span>
                          </div>
                          <div>
                            <span className="heading">
                              <i className="text-warning fas fa-gem"></i>{" "}
                              {this.context.user.stats
                                ? this.context.user.stats.diamonds
                                : 0}
                            </span>
                            <span className="description">Diamonds</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="my-4 bg-default">
                  <CardHeader className="bg-default">
                    <h2 className="text-white">Activity Log</h2>
                  </CardHeader>
                  <CardBody>
                    <ListGroup>
                      {this.context.user.stats &&
                        this.context.user.stats.logs
                          .slice(0, 10)
                          .map((item, index) => {
                            return (
                              <ListGroupItem
                                color={item.color}
                                className="clearfix"
                                key={index}
                                action
                              >
                                {item.title}
                              </ListGroupItem>
                            );
                          })}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : null}
      </>
    );
  }
}

export default Profile;
