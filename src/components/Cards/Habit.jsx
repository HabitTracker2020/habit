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
	ButtonGroup,
	Badge,
} from "reactstrap";
import GlobalContext from "../../context/Global";
import { db } from "../../firebase.js";

class Habit extends React.Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModalInputChange = this.handleModalInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateHabit = this.updateHabit.bind(this);
		this.deleteHabit = this.deleteHabit.bind(this);
		this.doHabit = this.doHabit.bind(this);
	}
	state = {
		habits: [],
		item: "",
		habitModal: false,
		healthModal: false,
		modelProps: {
			title: "",
			type: "",
			difficulty: "",
		},
	};

	toggleModal = (name, props) => {
		this.setState({
			[name]: !this.state[name],
			modelProps: props,
		});
	};

	doHabit(habit) {
		const diamonds = {
			trivial: 1,
			easy: 1.5,
			medium: 2,
			hard: 3,
		};
		const health = {
			trivial: 1,
			easy: 2,
			medium: 3,
			hard: 4,
		};
		let newHealth, newDiamonds;
		if (habit.type === "good") {
			newHealth = this.context.user.stats.health + health[habit.difficulty];
			newDiamonds =
				this.context.user.stats.diamonds + diamonds[habit.difficulty];
			db.doc(`stats/${this.context.user.stats.id}`).update({
				health: newHealth % 100,
				diamonds: newDiamonds >= 500 ? 500 : newDiamonds,
				level: this.context.user.stats.level + (newHealth >= 100 ? 1 : 0),
				last: { title: habit.title, color: "success" },
			});
		} else {
			newHealth = this.context.user.stats.health - health[habit.difficulty];
			if (newHealth < 0) {
				console.log("out of health");
				this.toggleModal("healthModal", {
					title: "",
					type: "",
					difficulty: "",
				});
				return;
			}
			db.doc(`stats/${this.context.user.stats.id}`).update({
				health: newHealth % 100,
				last: { title: habit.title, color: "danger" },
			});
		}

		// db.doc(`stats/${this.context.user.stats.id}`).update({
		//   diamonds: this.context.user.stats.diamonds + data[habit.difficulty]
		// });
	}

	claimReward() {
		db.doc(`stats/${this.context.user.stats.id}`).update({
			diamonds: 0,
			health: 100,
			last: { title: "Health Refilled", color: "danger" },
		});
		this.toggleModal("healthModal", {
			title: "",
			type: "",
			difficulty: "",
		});
	}

	updateHabit(e) {
		e.preventDefault();
		db.doc(`habits/${this.state.modelProps.id}`).update(this.state.modelProps);
		this.toggleModal("habitModal", {
			title: "",
			type: "",
			difficulty: "",
		});
	}

	deleteHabit(e) {
		e.preventDefault();
		db.doc(`habits/${this.state.modelProps.id}`).delete();
		this.toggleModal("habitModal", {
			title: "",
			type: "",
			difficulty: "",
		});
	}

	componentDidMount() {
		if (this.context.isLogged) {
			db.collection("habits")
				.where("userId", "==", this.context.user.uid)
				.onSnapshot(
					(querySnapshot) => {
						var habits = [];
						querySnapshot.forEach((doc) => {
							habits.push({ ...doc.data(), id: doc.id });
						});
						this.setState({
							habits: [...habits],
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
		db.collection("habits").add({
			title: this.state.item,
			userId: this.context.user.uid,
		});
		this.setState({
			habits: [...this.state.habits, this.state.item],
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
								<h3 className="mb-1 text-white">Habits</h3>
							</Col>
							<Col md="8">
								<Form onSubmit={this.handleSubmit}>
									<Input
										className="form-control-alternative"
										id="input-habit"
										placeholder="add habit"
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
							{this.state.habits.map((item, index) => {
								return (
									<ListGroupItem
										color={
											item.type === "good"
												? "success"
												: item.type === "bad"
												? "danger"
												: ""
										}
										className="clearfix"
										onClick={() => this.toggleModal("habitModal", item)}
										key={index}
										action
									>
										{item.title}
										<Badge color="primary" className="ml-2" pill>
											{item.difficulty}
										</Badge>

										{item.type ? (
											<Button
												className="btn-icon btn-sm mr-2 float-right"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													this.doHabit(item);
												}}
												// outline
												color={
													item.type === "good"
														? "success"
														: item.type === "bad"
														? "danger"
														: ""
												}
												// color="secondary"
											>
												<span className="btn-inner--icon">
													<i
														className={`ni ni-fat-${
															item.type === "good"
																? "add"
																: item.type === "bad"
																? "delete"
																: ""
														}`}
													/>
												</span>
											</Button>
										) : null}
									</ListGroupItem>
								);
							})}
						</ListGroup>
					</CardBody>
				</Card>
				<Modal
					className="modal-dialog-centered"
					size="sm"
					isOpen={this.state.habitModal}
					toggle={() =>
						this.toggleModal("habitModal", {
							title: "",
							type: "",
							difficulty: "",
						})
					}
				>
					<div className="modal-body p-0">
						<Card className="bg-secondary shadow border-0">
							<CardHeader className="bg-transparent">
								<Row>
									<Col xs="6">
										<h3 className="mb-0">Edit Habit</h3>
									</Col>
									<Col xs="5" className="ml-4">
										<Button
											color="primary"
											href="#pablo"
											onClick={this.updateHabit}
											size="sm"
										>
											Save
										</Button>
										<Button
											color="danger"
											href="#pablo"
											onClick={this.deleteHabit}
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
										<label className="form-control-label" htmlFor="habit-title">
											Title
										</label>
										<Input
											type="text"
											name="title"
											value={this.state.modelProps.title}
											onChange={this.handleModalInputChange}
											id="habit-title"
										/>
									</FormGroup>
									<FormGroup>
										<ButtonGroup>
											<Button
												outline
												active={this.state.modelProps.type === "good"}
												name="type"
												value="good"
												color="success"
												onClick={this.handleModalInputChange}
											>
												Positive
											</Button>
											<Button
												outline
												name="type"
												value="bad"
												active={this.state.modelProps.type === "bad"}
												color="danger"
												onClick={this.handleModalInputChange}
											>
												Negative
											</Button>
										</ButtonGroup>
									</FormGroup>
									<FormGroup>
										<ButtonGroup>
											<Button
												outline
												name="difficulty"
												value="trivial"
												active={this.state.modelProps.difficulty === "trivial"}
												color="primary"
												onClick={this.handleModalInputChange}
											>
												Trivial
											</Button>
											<Button
												outline
												name="difficulty"
												value="easy"
												active={this.state.modelProps.difficulty === "easy"}
												color="primary"
												onClick={this.handleModalInputChange}
											>
												Easy
											</Button>
											<Button
												outline
												name="difficulty"
												value="medium"
												active={this.state.modelProps.difficulty === "medium"}
												color="primary"
												onClick={this.handleModalInputChange}
											>
												Medium
											</Button>
											<Button
												outline
												name="difficulty"
												value="hard"
												active={this.state.modelProps.difficulty === "hard"}
												color="primary"
												onClick={this.handleModalInputChange}
											>
												Hard
											</Button>
										</ButtonGroup>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Modal>
				<Modal
					className="modal-dialog-centered"
					size="sm"
					isOpen={this.state.healthModal}
					toggle={() =>
						this.toggleModal("healthModal", {
							title: "",
							type: "",
							difficulty: "",
						})
					}
				>
					<div className="modal-body p-0">
						<Card className="bg-secondary shadow border-0">
							<CardHeader className="bg-transparent">
								<h3 className="mb-0">You ran out of Health!</h3>
							</CardHeader>
							<CardBody>
								<div className="btn-wrapper text-center">
									{this.context.user.stats ? (
										this.context.user.stats.diamonds >= 50 ? (
											<Button
												className="btn-neutral btn-icon"
												color="warning"
												href="#pablo"
												onClick={() => this.claimReward()}
											>
												<span className="btn-inner--icon">
													<i className="ni ni-diamond" />
												</span>

												<span className="btn-inner--text">
													Refill Health With{" "}
													{`${this.context.user.stats.diamonds}`}
												</span>
											</Button>
										) : (
											<small>
												You Dont Have Enough Diamonds To Refill Health
											</small>
										)
									) : null}
								</div>
							</CardBody>
						</Card>
					</div>
				</Modal>
			</>
		);
	}
}

export default Habit;
