import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import axios from "axios";
import {
	Container,
	Content,
	List,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch,
	Spinner,
	Thumbnail
} from "native-base";

import config from "../config.json";

export default class MarketCap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			ticker: [],
			error: null
		};
	}

	componentDidMount = () => {
		var t = this;
		const fetchUrl = config.api.base + "/api/data/marketcap";
		axios(fetchUrl)
			.then(res => res.data)
			.then(response => {
				console.log({ response });
				alert("Res", response);
				alert("Res str", response.toString());
				alert("T", t);
				if (response) {
					t.setState({ loading: false, ticker: response });
				} else {
					t.setState({
						loading: false,
						error: "Something went wrong."
					});
				}
			})
			.catch(e => {
				console.log(e);
				t.setState({
					loading: false,
					error: "Something went wrong." + e
				});
			});
	};

	render() {
		const { ticker, loading, error } = this.state;
		if (loading) {
			var content = <Spinner />;
		} else if (error) {
			var content = <Text>{error}</Text>;
		} else {
			var content = <ListOfCoins ticker={ticker} />;
		}
		return (
			<Container>
				<Header {...this.props} title="Market Cap" />
				<Content>{content}</Content>
			</Container>
		);
	}
}

class ListOfCoins extends Component {
	render() {
		const { ticker } = this.props;
		let list = ticker.map(ticker => {
			let percentage;
			if (ticker.percent_change_24h.indexOf("-") > -1) {
				percentage = (
					<Text style={[styles.percentage, styles.down]}>
						{ticker.percent_change_24h}
					</Text>
				);
			} else {
				percentage = (
					<Text style={[styles.percentage, styles.up]}>
						{ticker.percent_change_24h}
					</Text>
				);
			}
			return (
				<ListItem key={ticker.id}>
					<Thumbnail
						size={32}
						source={{
							uri: `https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${ticker.symbol.toLowerCase()}.png`
						}}
					/>
					<Body>
						<Text>{ticker.name}</Text>
						<Text note>{ticker.price_inr} INR</Text>
					</Body>
					<Right>
						<Text note>{percentage}</Text>
					</Right>
				</ListItem>
			);
		});
		console.log({ list });
		return <List>{list}</List>;
	}
}

const styles = StyleSheet.create({
	percentage: {
		fontSize: 24
	},
	up: {
		color: "green"
	},
	down: {
		color: "red"
	}
});
