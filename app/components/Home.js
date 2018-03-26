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
			PickerOptionsCurrencies: []
		};
		this.currencyPickerCancel = this.currencyPickerCancel.bind(this);
		this.currencyPickerSelect = this.currencyPickerSelect.bind(this);
	}

	componentWillReceiveProps() {
		// Pre-fill pickerOne / picker
		// Currencies
		const PickerOptionsCurrencies = [];
		this.props.availableCurrencies.forEach(currency => {
			PickerOptionsCurrencies.push({
				key: currency,
				label: this.props.currencies[currency.toString()]
			});
		});
		this.setState({ PickerOptionsCurrencies });
		console.log({ PickerOptionsCurrencies });
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

	render() {
		const { currencyPickerVisible, PickerOptionsCurrencies } = this.state;
		return (
			<Row style={styles.pickerOne}>
				<Grid>
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
						<Button transparent dark iconRight>
							{this.getExchange()}
							<Icon name="ios-arrow-down" />
						</Button>
					</Col>
				</Grid>
			</Row>
		);
	}
}

const styles = StyleSheet.create({
	pickerOne: {
		backgroundColor: "#ddd",
		height: 50
	}
});
