import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
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
	Input,
	Toast
} from "native-base";
import { NavigationActions } from "react-navigation";

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
			},
			successModal: true
		};
		this.updateSelection = this.updateSelection.bind(this);
		this.submitButton = this.submitButton.bind(this);
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
		if (
			!selected ||
			!selected.selectedCurrency ||
			!selected.selectedExchange ||
			!selected.inputCoins ||
			!selected.inputBuyValue
		) {
			Toast.show({
				text: "Please fill all the fields",
				buttonText: "Okay",
				type: "danger",
				duration: 2000
			});
			return false;
		}
		console.log({ selected });
		// ToDo: Send Request
		this.setState({ successModal: true });
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
						<Button full onPress={this.submitButton}>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.successModal}
					onRequestClose={() => {
						alert("Modal has been closed.");
					}}
				>
					<SuccessModal {...this.props} />
				</Modal>
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
		var selected = this.props.selected;
		selected.selectedExchange = value;
		this.props.updateSelection(selected);
	}
	onChangeCurrency(value: string) {
		this.setState({
			selectedCurrency: value
		});
		var selected = this.props.selected;
		selected.selectedCurrency = value;
		this.props.updateSelection(selected);
	}
	inputCoins(value) {
		this.setState({ inputCoins: value });
		var selected = this.props.selected;
		selected.inputCoins = value;
		this.props.updateSelection(selected);
	}
	inputBuyValue(value) {
		this.setState({ inputBuyValue: value });
		var selected = this.props.selected;
		selected.inputBuyValue = value;
		this.props.updateSelection(selected);
	}
	render() {
		const { exchanges } = this.props;
		const {
			toSelectCurrencies,
			showCurrencySelector,
			selectedCurrency
		} = this.state;
		const pickerItemsExchanges = exchanges.map(e => (
			<Picker.Item label={e.displayName} value={e.code} key={e.code} />
		));
		const pickerItemsCurrencies = toSelectCurrencies.map(c => (
			<Picker.Item label={c} value={c} key={c} />
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
						style={{ width: 150 }}
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
							style={{ width: 150 }}
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
									onChangeText={value => this.inputCoins(value)}
								/>
							</Item>
							<Item regular>
								<Input
									placeholder="Buy Value in INR"
									keyboardType="numeric"
									onChangeText={inputBuyValue =>
										this.inputBuyValue(inputBuyValue)
									}
								/>
							</Item>
						</View>
					)}
			</Form>
		);
	}
}

class SuccessModal extends Component {
	componentDidMount() {
		setTimeout(() => {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: "Home" })]
			});
			this.props.navigation.dispatch(resetAction);
			this.props.navigation.navigate("Portfolio");
		}, 1500);
	}
	render() {
		return (
			<View style={styles.successModal}>
				<Icon
					name="md-checkbox-outline"
					style={{ color: "green", fontSize: 50 }}
				/>
			</View>
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
	},
	successModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});
