import React from "react";
import { Card, CardHeader, CardBody, Row, Col, CardTitle } from "reactstrap";
import GlobalContext from "../../context/Global";

class Profile extends React.Component {
  static contextType = GlobalContext;

  render() {
    return (
      <Card className="card-profile shadow">
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
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
        <CardBody className="pt-0 pt-md-4">
          <Row>
            <div className="col">
              <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                <div>
                  <span className="heading">0</span>
                  <span className="description">Friends</span>
                </div>
              </div>
            </div>
          </Row>
          <div className="text-center">
            <h3>{this.context.user.displayName}</h3>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Profile;
