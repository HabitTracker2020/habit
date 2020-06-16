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
  Badge,
} from "reactstrap";
import GlobalContext from "../../context/Global";
import { db } from "../../firebase.js";

class Habit extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  state = {
    todos: [],
    item: "",
  };

  componentDidMount() {
    if (this.context.isLogged) {
      db.collection("todos")
        .where("userId", "==", this.context.user.uid)
        .onSnapshot(
          (querySnapshot) => {
            var todos = [];
            querySnapshot.forEach((doc) => {
              todos.push({ ...doc.data(), id: doc.id });
            });
            this.setState({
              todos: [...todos],
            });
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  }

  updateStatus(e, id, completed, title) {
    e.preventDefault();
    db.doc(`todos/${id}`)
      .update({ completed, userId: this.context.user.uid })
      .then(() => this.setState({}));
    db.doc(`stats/${this.context.user.stats.id}`).update({
      last: { title: title, color: "info" },
      logs: [
        { title: title, color: "info" },
        ...(this.context.user.stats.logs
          ? this.context.user.stats.logs.slice(1, 10)
          : []),
      ],
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
    db.collection("todos").add({
      title: this.state.item,
      userId: this.context.user.uid,
    });
    this.setState({
      todos: [...this.state.todos, this.state.item],
      item: "",
    });
  }
  render() {
    return (
      <Card className="bg-default shadow">
        <CardHeader className="bg-default text-white border-0">
          <Row className="align-items-center">
            <Col>
              <h3 className="mb-1 text-white">Todos</h3>
            </Col>
            <Col md="8">
              <Form onSubmit={this.handleSubmit}>
                <Input
                  className="form-control-alternative"
                  id="input-todo"
                  placeholder="add todo"
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
            {this.state.todos.map((item, index) => {
              return (
                <ListGroupItem tag="div" className="clearfix" key={index}>
                  {item.completed ? (
                    <>
                      <del>{item.title}</del>
                      <Badge color="success" className="ml-2" pill>
                        done
                      </Badge>
                    </>
                  ) : (
                    item.title
                  )}

                  <Button
                    className="btn-icon btn-sm mr-2 float-right"
                    outline
                    onClick={(e) =>
                      this.updateStatus(e, item.id, !item.completed, item.title)
                    }
                    color="success"
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni-check-bold" />
                    </span>
                  </Button>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default Habit;
