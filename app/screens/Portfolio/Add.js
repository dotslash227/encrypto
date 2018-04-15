import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
	Container,
	Content,
	Footer,
	FooterTab,
	Button,
	Text,
	Spinner,
	Grid,
	Col,
	Form,
	Picker,
	Icon,
	Item,
	Input
} from "native-base";

// Components:
import Header from "../../components/Header";
import Value from "../../components/Portfolio/Value";
import Holdings from "../../components/Portfolio/Holdings";

import { getLocalUser, cache } from "../../utils/common";

export default class AddPortfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exchanges: null,
			currencies: null,
			availableCurrencies: null,
			user: null,
			loggedIn: false,
			selected: {
				selectedExchange: null,
				selectedCurrency: null,
				inputCoins: null,
				inputBuyValue: null
			}
		};
		this.updateSelection = this.updateSelection.bind(this);
	}

	componentWillMount() {
		cache.availableCurrencies((err, availableCurrencies) =>
			this.setState({ availableCurrencies })
		);
		cache.currencies((err, currencies) => this.setState({ currencies }));
		cache.exchanges((err, exchanges) => this.setState({ exchanges }));
	}

	componentDidMount() {}

	updateSelection(selected) {
		this.setState({ selected });
	}

	submitButton() {
		const { selected } = this.state;
		console.log({ selected });
	}

	render() {
		const { currencies, exchanges, availableCurrencies } = this.state;
		if (!currencies || !exchanges || !availableCurrencies) {
			return <Spinner />;
		}
		return (
			<Container>
				<Header {...this.props} title="Add To Portfolio" hasBackButton={true} />
				<Content>
					<MainSelector
						{...this.state}
						updateSelection={this.updateSelection}
					/>
				</Content>
				<Footer>
					<FooterTab>
						<Button full onPress={() => this.submitButton}>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

class MainSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedExchange: undefined,
			selectedCurrency: undefined,
			toSelectCurrencies: [],
			showCurrencySelector: false,
			inputCoins: undefined,
			inputBuyValue: undefined
		};
	}
	/* componentDidUpdate(nextProps, nextState) {
		const {
			selectedExchange,
			selectedCurrency,
			inputCoins,
			inputBuyValue
		} = this.state;
		this.props.updateSelection({
			selectedExchange,
			selectedCurrency,
			inputCoins,
			inputBuyValue
		});
	} */
	onChangeExchange(value: string) {
		const filter = this.props.exchanges.filter(e => e.code === value);
		const exchange = filter[0];
		this.setState({
			selectedExchange: value,
			toSelectCurrencies: exchange.currencies,
			selectedCurrency: undefined,
			showCurrencySelector: true
		});
	}
	onChangeCurrency(value: string) {
		this.setState({
			selectedCurrency: value
		});
	}
	render() {
		const { exchanges } = this.props;
		const {
			toSelectCurrencies,
			showCurrencySelector,
			selectedCurrency
		} = this.state;
		const pickerItemsExchanges = exchanges.map(e => (
			<Picker.Item label={e.displayName} value={e.code} />
		));
		const pickerItemsCurrencies = toSelectCurrencies.map(c => (
			<Picker.Item label={c} value={c} />
		));
		return (
			<Form>
				<View style={[styles.pickerViewExchange, styles.pickerView]}>
					<Text>Which Exchange is holding your currency?</Text>
					<Picker
						mode="dropdown"
						iosIcon={<Icon name="ios-arrow-down-outline" />}
						placeholder="Exchange"
						placeholderStyle={{ color: "#bfc6ea" }}
						placeholderIconColor="#007aff"
						style={{ width: undefined }}
						selectedValue={this.state.selectedExchange}
						onValueChange={this.onChangeExchange.bind(this)}
					>
						{pickerItemsExchanges}
					</Picker>
				</View>
				{showCurrencySelector && (
					<View style={[styles.pickerViewCurrency, styles.pickerView]}>
						<Text>Which Currency are you holding?</Text>
						<Picker
							mode="dropdown"
							iosIcon={<Icon name="ios-arrow-down-outline" />}
							placeholder="Currency"
							placeholderStyle={{ color: "#bfc6ea" }}
							placeholderIconColor="#007aff"
							style={{ width: undefined }}
							selectedValue={this.state.selectedCurrency}
							onValueChange={this.onChangeCurrency.bind(this)}
						>
							{pickerItemsCurrencies}
						</Picker>
					</View>
				)}
				{showCurrencySelector &&
					selectedCurrency && (
						<View style={styles.inputView}>
							<Item regular>
								<Input
									placeholder="Coins"
									keyboardType="numeric"
									onChangeText={inputCoins => this.setState({ inputCoins })}
								/>
							</Item>
							<Item regular>
								<Input
									placeholder="Buy Value in INR"
									keyboardType="numeric"
									onChangeText={inputBuyValue =>
										this.setState({ inputBuyValue })
									}
								/>
							</Item>
						</View>
					)}
			</Form>
		);
	}
}

const styles = StyleSheet.create({
	pickerView: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20
	},
	pickerViewExchange: {
		backgroundColor: "#DDDDDD"
	},
	pickerViewCurrency: {
		backgroundColor: "#EEEEEE"
	},
	inputView: {
		padding: 20
	}
});
