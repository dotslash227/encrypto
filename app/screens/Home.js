import React, { Component } from "react";
import { View } from "react-native";
import { HomeHeader } from "../components/Header";
import { PickerHeader } from "../components/Home";
import HomeCharts from "../components/HomeCharts";
import SplashScreen from "./SplashScreen";

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
				currencyTwo: "INR",
				exchange: "ZEB",
				exchangeTwo: "COINDELTA",
				isComparing: false,
				country: "IN",
				countryImage: '../assets/india.png'
			},
			graph: {
				range: 7 //Days
			}
		};
		this.changeSelection = this.changeSelection.bind(this);
		this.refreshScreen = this.refreshScreen.bind(this);
	}

	refreshScreen() {
		this.setState({ homeLoading: true });
		this.setState({ homeLoading: false });
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
					console.log({i, conLen: containers.length});
				})
				.catch(e => {
					console.log(e)
				});
		});
		setTimeout(() => {
			this.setState({ homeLoading: false });
		}, 2000);
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
		if (homeLoading) {
			return <SplashScreen />;
		}
		return (
			<Container>
				<HomeHeader
					{...this.props}
					{...this.state}
					changeSelection={this.changeSelection}
					hasTabs={true}
					refreshScreen={this.refreshScreen}
				/>
				<Content>
					<PickerHeader
						{...this.state}
						changeSelection={this.changeSelection}
					/>
					<HomeCharts {...this.state} />
				</Content>
				<Footer>
					<FooterTab style={{backgroundColor:"#324d79"}}>
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
							color = "#385686"
						>
							<Text>30D</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
