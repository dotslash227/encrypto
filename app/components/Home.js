import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Content, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import ModalFilterPicker from "react-native-modal-filter-picker";

export class PickerHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currencyPickerVisible: false,
			exchangePickerVisible: false,
			exchangePickerTwoVisible: false,
			PickerOptionsCurrencies: [],
			PickerOptionsExchanges: []
		};
		this.currencyPickerCancel = this.currencyPickerCancel.bind(this);
		this.currencyPickerSelect = this.currencyPickerSelect.bind(this);
		this.exchangePickerCancel = this.exchangePickerCancel.bind(this);
		this.exchangePickerSelect = this.exchangePickerSelect.bind(this);
		this.exchangePickerTwoCancel = this.exchangePickerTwoCancel.bind(this);
		this.exchangePickerTwoSelect = this.exchangePickerTwoSelect.bind(this);
		this.exchangePickerTwoToggle = this.exchangePickerTwoToggle.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log({ EXCHANGES: nextProps.exchanges });
		// Pre-fill pickerOne / picker
		// Currencies
		const PickerOptionsCurrencies = [];
		nextProps.availableCurrencies.forEach(currency => {
			PickerOptionsCurrencies.push({
				key: currency,
				label: nextProps.currencies[currency.toString()]
			});
		});
		this.setState({ PickerOptionsCurrencies });

		// Exchanges
		const PickerOptionsExchanges = [];
		nextProps.exchanges.forEach(exchange => {
			PickerOptionsExchanges.push({
				key: exchange.code,
				label: exchange.displayName
			});
		});
		console.log({ PickerOptionsExchanges: nextProps.exchanges });
		this.setState({ PickerOptionsExchanges });
	}

	getExchange() {
		let exchanges = this.props.exchanges;
		let exchange = exchanges.filter(
			exchange => exchange.code === this.props.selected.exchange
		);
		//console.log(exchange);
		if (exchange.length > 0)
			return <Text style={styles.pickerButton}>{exchange[0].displayName}</Text>;
		else
			return (
				<Text style={styles.pickerButton}>{this.props.selected.exchange}</Text>
			);
	}

	// Currency Picker One
	currencyPickerToggle(toggle) {
		this.setState({ currencyPickerVisible: toggle });
	}
	currencyPickerSelect(selected) {
		let selectedProps = JSON.parse(JSON.stringify(this.props.selected));
		selectedProps.currency = selected;
		this.props.changeSelection({ selected: selectedProps });
		this.setState({ currencyPickerVisible: false });
	}
	currencyPickerCancel(selected) {
		this.setState({ currencyPickerVisible: false });
	}

	// Exchange Picker One
	exchangePickerToggle(toggle) {
		this.setState({ exchangePickerVisible: toggle });
	}
	exchangePickerSelect(selected) {
		let selectedProps = JSON.parse(JSON.stringify(this.props.selected));
		selectedProps.exchange = selected;
		this.props.changeSelection({ selected: selectedProps });
		this.setState({ exchangePickerVisible: false });
	}
	exchangePickerCancel(selected) {
		this.setState({ exchangePickerVisible: false });
	}

	// Exchange Picker Two
	exchangePickerTwoToggle(toggle) {
		this.setState({ exchangePickerTwoVisible: toggle });
	}
	exchangePickerTwoSelect(selected) {
		let selectedProps = JSON.parse(JSON.stringify(this.props.selected));
		selectedProps.exchangeTwo = selected;
		this.props.changeSelection({ selected: selectedProps });
		this.setState({ exchangePickerTwoVisible: false });
	}
	exchangePickerTwoCancel(selected) {
		this.setState({ exchangePickerTwoVisible: false });
	}

	render() {
		const {
			currencyPickerVisible,
			PickerOptionsCurrencies,
			PickerOptionsExchanges,
			exchangePickerVisible
		} = this.state;
		return (
			<View>
				<Grid style={styles.pickerOne}>
					<Col>
						<Button
							transparent
							dark
							iconRight
							onPress={() => this.currencyPickerToggle(true)}
						>
							<Text style={styles.pickerButton}>
								{this.props.selected.currency}
							</Text>
							<Icon name="ios-arrow-down" style={styles.pickerButton} />
							<ModalFilterPicker
								visible={currencyPickerVisible}
								onSelect={this.currencyPickerSelect}
								onCancel={this.currencyPickerCancel}
								options={PickerOptionsCurrencies}
								onRequestClose={this.currencyPickerCancel}
							/>
						</Button>
					</Col>
					<Col>
						<Button
							transparent
							dark
							iconRight
							onPress={() => this.exchangePickerToggle(true)}
						>
							{this.getExchange()}
							<Icon name="ios-arrow-down" style={styles.pickerButton} />
							<ModalFilterPicker
								visible={exchangePickerVisible}
								onSelect={this.exchangePickerSelect}
								onCancel={this.exchangePickerCancel}
								options={PickerOptionsExchanges}
							/>
						</Button>
					</Col>
				</Grid>
				<PickerTwoContainer
					{...this.state}
					{...this.props}
					exchangePickerTwoSelect={this.exchangePickerTwoSelect}
					exchangePickerTwoCancel={this.exchangePickerTwoCancel}
					exchangePickerTwoToggle={this.exchangePickerTwoToggle}
				/>
			</View>
		);
	}
}

export class PickerTwoContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			compareOn: false
		};
	}

	// Function to toggle comparison button
	toggleCompare() {
		let currentState = this.state.compareOn;
		console.log({ currentState, opp: !currentState });
		this.setState({ compareOn: !currentState });
		let selectedProps = JSON.parse(JSON.stringify(this.props.selected));
		selectedProps.isComparing = true;
		this.props.changeSelection({ selected: selectedProps });
	}

	getExchange() {
		let exchanges = this.props.exchanges;
		let exchange = exchanges.filter(
			exchange => exchange.code === this.props.selected.exchangeTwo
		);
		//console.log(exchange);
		if (exchange.length > 0)
			return <Text style={styles.pickerButton}>{exchange[0].displayName}</Text>;
		else
			return (
				<Text style={styles.pickerButton}>{this.props.selected.exchange}</Text>
			);
	}

	render() {
		const { compareOn } = this.state;
		let viewContainer;
		if (compareOn) {
			viewContainer = (
				<Grid style={styles.pickerTwoGrid}>
					<Col>
						<Button transparent dark iconRight>
							<Text style={styles.pickerButton}>
								{this.props.selected.currency}
							</Text>
							<Icon name="ios-arrow-down" style={styles.pickerButton} />
						</Button>
					</Col>
					<Col>
						<Button
							transparent
							dark
							iconRight
							onPress={() => this.props.exchangePickerTwoToggle(true)}
						>
							{this.getExchange()}
							<Icon name="ios-arrow-down" style={styles.pickerButton} />
							<ModalFilterPicker
								visible={this.props.exchangePickerTwoVisible}
								onSelect={this.props.exchangePickerTwoSelect}
								onCancel={this.props.exchangePickerTwoCancel}
								options={this.props.PickerOptionsExchanges}
							/>
						</Button>
					</Col>
				</Grid>
			);
		} else {
			viewContainer = (
				<Button transparent dark onPress={() => this.toggleCompare()}>
					<Text style={styles.pickerButton}>Add To Compare</Text>
				</Button>
			);
		}
		return <View style={styles.pickerTwoContainer}>{viewContainer}</View>;
	}
}

const styles = StyleSheet.create({
	pickerOne: {
		backgroundColor: "#255965",
		height: 50
	},
	pickerTwoContainer: {
		backgroundColor: "#255965",
		alignItems: "center",
		justifyContent: "center"
	},
	pickerButton: {
		color: "#fff"
	}
});
