import React, { Component } from "react";
import { View } from "react-native";
import {
	Container,
	Content,
	Footer,
	FooterTab,
	Button,
	Text
} from "native-base";

// Components:
import Header from "../../components/Header";
import Value from "../../components/Portfolio/Value";
import Holdings from "../../components/Portfolio/Holdings";

import { getLocalUser } from "../../utils/common";

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 600,
			change: "0%",
			portfolio: [],
			user: null,
			loggedIn: false
		};
	}

	componentWillMount() {
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in", user);
				this.setState({ loggedIn: true, user });
			} else {
				console.log("User is not logged in");
				this.props.navigation.navigate("Login");
			}
		});
	}

	componentDidMount() {}

	render() {
		return (
			<Container>
				<Header {...this.props} title="Portfolio" />
				<Content>
					<Value value={this.state.value} change={this.state.change} />
					<Holdings portfolio={this.state.portfolio} />
				</Content>
				<Footer>
					<FooterTab>
						<Button
							full
							onPress={() => this.props.navigation.navigate("AddToPortfolio")}
						>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
