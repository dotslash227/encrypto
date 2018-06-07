//
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
	Thumbnail,
	Button,
	Grid,
	Col,
	Row
} from "native-base";

import SearchBar from 'react-native-searchbar';
import { formatRate } from "../utils/common";

export default class MarketCap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			ticker: [],
			error: null
		};
		this.showSearchBar = this.showSearchBar.bind(this);
		this._handleResults = this._handleResults.bind(this);
		this.searchOnBack = this.searchOnBack.bind(this);
	}

	fetchMarketRates() {
		fetch("https://satoshi.encrypto.tech/api/data/marketcap?limit=2000", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(response => {
				this.setState({ loading: false, ticker: response });
			})
			.catch(e => {
				console.log(e);
				this.setState({ loading: false, error: "Something went wrong." });
			});
	}

	componentDidMount() {
		this.fetchMarketRates();
	}

	_handleResults(results) {
		this.setState({ ticker: results });
	  }
	
	showSearchBar() {
		this.searchBar.show();
	}

	searchOnBack() {
		this.fetchMarketRates();
		this.searchBar.hide();
	}

	render() {
		const { ticker, loading, error } = this.state;
		let content;
		if (loading) {
			content = <Spinner />;
		} else {
			content = (<ListOfCoins ticker={ticker} />);
		}
		return (
			<Container>
				<SearchBar
			ref={(ref) => this.searchBar = ref}
			data={ticker}
			onBack={this.searchOnBack}
			handleResults={this._handleResults}
		  />
		  <Header {...this.props} title="Market Cap" hasSearch={true} showSearch={this.showSearchBar} />
					<Content>{content}</Content>
			</Container>
		);
	}
}

class ListOfCoins extends Component {
	render() {
		const { ticker } = this.props;
		let list = ticker.map(ticker => {
			return <SingleRow ticker={ticker} />;
		});
		return (
			<View>
				<Grid style={[styles.tableRow, {backgroundColor: "#F2F2F2"}]}>
					<Col size={30}><Text style={styles.tableText}>Name</Text></Col>
					<Col size={30}><Text style={styles.tableText}>Market Cap</Text></Col>
					<Col size={15}><Text style={styles.tableText}>Price</Text></Col>
					<Col size={15}><Text style={styles.tableText}>Change</Text></Col>
				</Grid>
				{list}
			</View>
		);
	}
}

class SingleRow extends Component {
	render() {
		const ticker = this.props.ticker;
		let percentage;
			if (ticker.percent_change_24h.indexOf("-") > -1) {
				percentage = (
					<Text style={[styles.percentage, styles.down, styles.tableText]}>
						-{ticker.percent_change_24h}%
					</Text>
				);
			} else {
				percentage = (
					<Text style={[styles.percentage, styles.up, styles.tableText]}>
						+{ticker.percent_change_24h}%
					</Text>
				);
			}
			return (
				<View key={ticker.id} style={styles.tableRow}>
					<Grid><Col size={30}><Text style={styles.tableText}>{ticker.name} ({ticker.symbol})</Text></Col>
					<Col size={30}><Text style={[styles.tableText, {fontSize: 10}]}>{formatRate(ticker.market_cap_usd)}</Text></Col>
					<Col size={15}><Text style={styles.tableText}>{formatRate(ticker.price_usd)}</Text></Col>
					<Col size={15}>{percentage}</Col></Grid>
				</View>
			);
	}
}

const styles = StyleSheet.create({
	percentage: {
		fontSize: 10
	},
	up: {
		color: "green"
	},
	down: {
		color: "red"
	},
	tableText: {
		fontSize: 11,
		textAlign: "center"
	},
	tableRow: {
		paddingTop: 10,
		paddingBottom: 10
	}
});