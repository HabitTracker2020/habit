import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Input,
  Button,
  FormGroup,
  Modal,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import GlobalContext from "../../context/Global";
import { db } from "../../firebase.js";

class Reward extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModalInputChange = this.handleModalInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReward = this.updateReward.bind(this);
    this.deleteReward = this.deleteReward.bind(this);
    this.claimReward = this.claimReward.bind(this);
  }
  state = {
    rewards: [],
    item: "",
    rewardModal: false,
    claimModal: false,
    modelProps: { title: "", cost: 0 },
  };

  toggleModal = (name, props) => {
    this.setState({
      [name]: !this.state[name],
      modelProps: props,
    });
  };

  claimReward(cost, title) {
    db.doc(`stats/${this.context.user.stats.id}`).update({
      diamonds: this.context.user.stats.diamonds - cost,
      last: { title: title + " Claimed", color: "warning" },
      logs: [
        { title: title + " Claimed", color: "warning" },
        ...(this.context.user.stats.logs
          ? this.context.user.stats.logs.slice(1, 10)
          : []),
      ],
    });
    this.toggleModal("claimModal", {
      title,
      cost: this.context.user.stats.diamonds - cost,
    });
  }

  updateReward(e) {
    e.preventDefault();
    db.doc(`rewards/${this.state.modelProps.id}`).update(this.state.modelProps);
    this.toggleModal("rewardModal", { title: "", cost: 0 });
  }

  deleteReward(e) {
    e.preventDefault();
    db.doc(`rewards/${this.state.modelProps.id}`).delete();
    this.toggleModal("rewardModal", { title: "", cost: 0 });
  }

  componentDidMount() {
    if (this.context.isLogged) {
      db.collection("rewards")
        .where("userId", "==", this.context.user.uid)
        .onSnapshot(
          (querySnapshot) => {
            var rewards = [];
            querySnapshot.forEach((doc) => {
              rewards.push({ ...doc.data(), id: doc.id });
            });
            this.setState({
              rewards: [...rewards],
            });
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  }

  handleModalInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      modelProps: { ...this.state.modelProps, [name]: value },
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    db.collection("rewards").add({
      title: this.state.item,
      cost: 0,
      userId: this.context.user.uid,
    });
    this.setState({
      rewards: [...this.state.rewards, this.state.item],
      item: "",
    });
  }

  render() {
    return (
      <>
        <Card className="bg-default shadow">
          <CardHeader className="bg-default text-white border-0">
            <Row className="align-items-center">
              <Col>
                <h3 className="mb-1 text-white">Rewards</h3>
              </Col>
              <Col md="8">
                <Form onSubmit={this.handleSubmit}>
                  <Input
                    className="form-control-alternative"
                    id="input-reward"
                    placeholder="add reward"
                    type="text"
                    name="item"
                    onChange={this.handleInputChange}
                    value={this.state.item}
                  />
                </Form>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ListGroup>
              {this.state.rewards.map((item, index) => {
                return (
                  <ListGroupItem
                    className="clearfix"
                    onClick={() => this.toggleModal("rewardModal", item)}
                    key={index}
                  >
                    {item.title}
                    <Button
                      className="btn-icon btn-sm mr-2 float-right"
                      outline
                      onClick={(e) => {
                        e.stopPropagation();
                        this.claimReward(item.cost, item.title);
                      }}
                      color="warning"
                      disabled={item.cost > this.context.user.stats.diamonds}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-diamond" />
                      </span>
                      <span>{item.cost}</span>
                    </Button>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </CardBody>
        </Card>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.rewardModal}
          toggle={() => this.toggleModal("rewardModal", { title: "", cost: 0 })}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
                <Row>
                  <Col xs="6">
                    <h3 className="mb-0">Edit Reward</h3>
                  </Col>
                  <Col xs="5" className="ml-4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.updateReward}
                      size="sm"
                    >
                      Save
                    </Button>
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={this.deleteReward}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="reward-title"
                    >
                      Title
                    </label>
                    <Input
                      type="text"
                      name="title"
                      className="form-control-alternative"
                      value={this.state.modelProps.title}
                      onChange={this.handleModalInputChange}
                      id="reward-title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-diamond text-warning" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        placeholder="cost"
                        value={this.state.modelProps.cost}
                        onChange={this.handleModalInputChange}
                        name="cost"
                        type="number"
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.claimModal}
          toggle={() =>
            this.toggleModal("claimModal", {
              title: "",
              cost: 0,
            })
          }
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">
                  You Just Claimed {this.state.modelProps.cost} for{" "}
                  {this.state.modelProps.title}
                </h3>
              </CardHeader>
            </Card>
          </div>
        </Modal>
      </>
    );
  }
}

export default Reward;
