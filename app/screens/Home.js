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
	Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		let containers = ["currencies", "availableCurrencies", "exchanges"];
		containers.forEach(container => {
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
		const graphRange = this.state.graph.range;
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
