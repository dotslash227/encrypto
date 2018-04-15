import React, { Component } from "react";
import { View } from "react-native";
import Header from "../components/Header";
import { PickerHeader } from "../components/Home";
import HomeCharts from "../components/HomeCharts";

import {
	List,
	ListItem,
	Text,
	Content,
	Container,
	Footer,
	FooterTab,
	Button,
	Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homeLoading: true,
			availableCurrencies: [],
			exchanges: [],
			currencies: {},
			selected: {
				currency: "BTC",
				exchange: "ZEB",
				exchangeTwo: "COINDELTA",
				isComparing: false
			},
			graph: {
				range: 1 //Days
			}
		};
		this.changeSelection = this.changeSelection.bind(this);
	}

	componentDidMount() {
		let containers = ["availableCurrencies", "exchanges", "currencies"];
		let i = 1;
		containers.forEach(container => {
			i++;
			storage
				.load({
					key: container,
					autoSync: true,
					syncInBackground: true
				})
				.then(ret => {
					var stateChange = {};
					stateChange[container] = ret;
					console.log(stateChange);
					this.setState(stateChange);
					console.log(this.state);
					if (i >= containers.length) {
						this.setState({ homeLoading: false });
					}
				})
				.catch(e => console.log(e));
		});
	}

	setGraphRange(range) {
		range = parseInt(range);
		let graph = this.state.graph;
		graph.range = range;
		this.setState({ graph });
	}

	// Change Selection
	changeSelection(changes) {
		this.setState(changes);
	}

	render() {
		const { homeLoading } = this.state;
		const graphRange = this.state.graph.range;
		if (homeLoading) return <Spinner />;
		return (
			<Container>
				<Header {...this.props} />
				<Content>
					<PickerHeader
						{...this.state}
						changeSelection={this.changeSelection}
					/>
					<HomeCharts {...this.state} />
				</Content>
				<Footer>
					<FooterTab>
						<Button
							onPress={() => this.setGraphRange(1)}
							active={graphRange === 1}
						>
							<Text>1D</Text>
						</Button>
						<Button
							onPress={() => this.setGraphRange(7)}
							active={graphRange === 7}
						>
							<Text>1W</Text>
						</Button>
						<Button
							onPress={() => this.setGraphRange(30)}
							active={graphRange === 30}
						>
							<Text>30D</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
