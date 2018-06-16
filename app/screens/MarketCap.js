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
import { formatRate, getCacheUsingKey } from "../utils/common";

export default class MarketCap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			ticker: [],
			error: null,
			display: 10
		};
		this.showSearchBar = this.showSearchBar.bind(this);
		this._handleResults = this._handleResults.bind(this);
		this.searchOnBack = this.searchOnBack.bind(this);
		this.fetchMarketRates = this.fetchMarketRates.bind(this);
	}

	fetchMarketRates() {
		var _this = this;
		storage
		.load({
			key: "marketCap",
			autoSync: true,
			syncInBackground: true
		})
		.then(ret => {
			Promise.resolve(JSON.parse(ret)).then(ticker => {
				_this.setState({ loading: false, ticker: ticker });
			});
		})
		.catch(e => {
			_this.setState({ loading: false, error: "Something went wrong." });
			console.log(e, null)
		});
	}

	componentDidMount() {
		this.fetchMarketRates();
	}

	_handleResults(results) {
		console.log("Handle Results was fired");
		this.setState({ ticker: results });
	  }

	showSearchBar() {
		this.searchBar.show();
	}

	searchOnBack() {
		this.fetchMarketRates();
		this.searchBar.hide();
	}
	
	loadMore() {
		const display = this.state.display;
		this.setState({display: display + 10});
	}

	render() {
		const { ticker, loading, error } = this.state;
		let content;
		if (loading) {
			content = <Spinner />;
		} else if(error) {
			content = <Text>Somthing went wrong</Text>;
		} else {
			content = (<ListOfCoins ticker={ticker} display={this.state.display} />);
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
					<Content>
					{content}
					<Button full light onPress={() => this.loadMore()}><Text>More</Text></Button>
					</Content>
			</Container>
		);
	}
}

class ListOfCoins extends Component {
	render() {
		let ticker = this.props.ticker;
		ticker = ticker.slice(0, (this.props.display || 5));
		let list = ticker.map(ticker => {
			return <SingleRow key={ticker.id} ticker={ticker} />;
		});
		return (
			<View>
				<Grid style={[styles.tableRow, {backgroundColor: "#F2F2F2"}]}>
					<Col size={30}><Text style={styles.tableText}>Currency Name</Text></Col>
					<Col size={30}><Text style={styles.tableText}>Market Cap (USD)</Text></Col>
					<Col size={15}><Text style={styles.tableText}>Price (USD)</Text></Col>
					<Col size={15}><Text style={styles.tableText}>% Change</Text></Col>
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
