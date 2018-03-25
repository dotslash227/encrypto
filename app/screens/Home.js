import React, { Component } from "react";
import { View } from "react-native";
import Header from "../components/Header";
import { PickerHeader } from "../components/Home";

import { List, ListItem, Text, Content, Container } from "native-base";
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
				exchange: "ZEB"
			}
		};
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

	// Change Selection
	changeSelection(changes) {
		this.setState(changes);
	}

	render() {
		return (
			<Container>
				<Header {...this.props} />
				<Content>
					<Grid>
						<PickerHeader {...this.state} />
					</Grid>
				</Content>
			</Container>
		);
	}
}
