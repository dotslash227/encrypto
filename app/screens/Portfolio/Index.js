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

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 600,
			change: "0%",
			portfolio: []
		};
	}

	componentWillMount() {}

	render() {
		return (
			<Container>
				<Header {...this.props} title="Portfolio" />
				<Content>
					<Value
						value={this.state.value}
						change={this.state.change}
					/>
					<Holdings portfolio={this.state.portfolio} />
				</Content>
				<Footer>
					<FooterTab>
						<Button full>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
