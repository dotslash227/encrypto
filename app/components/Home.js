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
			PickerOptionsCurrencies: [],
			PickerOptionsExchanges: []
		};
		this.currencyPickerCancel = this.currencyPickerCancel.bind(this);
		this.currencyPickerSelect = this.currencyPickerSelect.bind(this);
		this.exchangePickerCancel = this.exchangePickerCancel.bind(this);
		this.exchangePickerSelect = this.exchangePickerSelect.bind(this);
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
		if (exchange.length > 0) return <Text>{exchange[0].displayName}</Text>;
		else return <Text>{this.props.selected.exchange}</Text>;
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

	render() {
		const {
			currencyPickerVisible,
			PickerOptionsCurrencies,
			PickerOptionsExchanges,
			exchangePickerVisible
		} = this.state;
		return (
			<Grid style={styles.pickerOne}>
				<Col>
					<Button
						transparent
						dark
						iconRight
						onPress={() => this.currencyPickerToggle(true)}
					>
						<Text>{this.props.selected.currency}</Text>
						<Icon name="ios-arrow-down" />
						<ModalFilterPicker
							visible={currencyPickerVisible}
							onSelect={this.currencyPickerSelect}
							onCancel={this.currencyPickerCancel}
							options={PickerOptionsCurrencies}
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
						<Icon name="ios-arrow-down" />
						<ModalFilterPicker
							visible={exchangePickerVisible}
							onSelect={this.exchangePickerSelect}
							onCancel={this.exchangePickerCancel}
							options={PickerOptionsExchanges}
						/>
					</Button>
				</Col>
			</Grid>
		);
	}
}

const styles = StyleSheet.create({
	pickerOne: {
		backgroundColor: "#ddd",
		height: 50
	}
});
