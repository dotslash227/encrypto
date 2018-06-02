import React, { Component } from "react";
import { View } from "react-native";
import {
	Container,
	Content,
	Footer,
	FooterTab,
	Button,
	Text,
	Spinner
} from "native-base";

// Components:
import Header from "../../components/Header";
import Value from "../../components/Portfolio/Value";
import Holdings from "../../components/Portfolio/Holdings";

import { getLocalUser, cache, formatRate } from "../../utils/common";
import config from "../../config.json";

export default class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 600,
			change: "0%",
			portfolio: [],
			user: null,
			loggedIn: false,
			screenLoading: true,
			availableCurrencies: null,
			currencies: null,
			exchanges: null
		};
	}

	componentWillMount() {
		var _this = this;
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in", user);
				_this.setState({ loggedIn: true, user });
				_this.fetchPortfolio();
				cache.availableCurrencies((err, availableCurrencies) =>
					_this.setState({ availableCurrencies })
				);
				cache.currencies((err, currencies) => this.setState({ currencies }));
				cache.exchanges((err, exchanges) => this.setState({ exchanges }));
			} else {
				console.log("User is not logged in");
				_this.props.navigation.navigate("Login");
			}
		});
	}

	fetchPortfolio() {
		// Fetch User's Portfolio:
		fetch(
			`${config.api.base}/api/portfolio?token=${this.state.user.token}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.json())
			.then(response => {
				console.log({response});
				if (response && response.success) {
					this.setState({portfolio: response.portfolio, screenLoading: false});
				}
				else {
					this.setState({screenLoading: false});
					return alert("Something Went Wrong")
				};
			})
			.catch(e => {
				this.setState({screenLoading: false});
				console.log(e);
				return alert("Something Went Wrong");
			});
	}

	calculateValues(portfolio) {
		var sum = 0;
		var change = 0;
		portfolio.forEach(p => sum += p.track.currentValue);
		return { value: sum, change };
	}

	render() {
		const { screenLoading, portfolio } = this.state;
		let isEmpty = false;
		if(screenLoading) {
			return <Spinner />;
		}
		if(!portfolio || portfolio.length === 0) {
			isEmpty = true;
		}
		var calculations = this.calculateValues(portfolio);
		return (
			<Container>
				<Header {...this.props} title="Portfolio" hasTabs={true} />
				<Content>
					<Value value={formatRate(calculations.value)} change={calculations.change} />
					<Holdings {...this.state} portfolio={this.state.portfolio} isEmpty={isEmpty} />
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
