import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
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

export default class MarketCap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			ticker: [],
			error: null
		};
	}

	componentDidMount() {
		fetch("https://api.coinmarketcap.com/v1/ticker/?convert=INR&limit=40", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response && response.length > 0) {
					this.setState({ loading: false, ticker: response });
				} else {
					this.setState({ loading: false, error: "Something went wrong." });
				}
			})
			.catch(e => {
				console.log(e);
				this.setState({ loading: false, error: "Something went wrong." });
			});
	}

	render() {
		const { ticker, loading, error } = this.state;
		let content;
		if (loading) {
			content = <Spinner />;
		} else if (error) {
			content = <Text>{error}</Text>;
		} else {
			content = <ListOfCoins ticker={ticker} />;
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
