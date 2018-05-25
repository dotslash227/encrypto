import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Slider } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
	Container,
	Footer,
	FooterTab,
	Button,
	Content,
	Picker,
	Item,
	Form,
	Icon,
	Input
} from "native-base";
import Header from "../../components/Header";

export default class AddModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: {
				selectedExchange: null,
				selectedCurrency: null,
				change: null
			},
			selectedExchange: undefined,
			selectedCurrency: undefined,
			toSelectCurrencies: [],
			showCurrencySelector: false,
			inputCoins: undefined,
			inputBuyValue: undefined
		};
	}

	componentDidMount() {
		//console.log({ props: this.props });
	}

	onChangeExchange(value) {
		const filter = this.props.exchanges.filter(e => e.code === value);
		const exchange = filter[0];
		this.setState({
			selectedExchange: value,
			toSelectCurrencies: exchange.currencies,
			selectedCurrency: undefined,
			showCurrencySelector: true
		});
		var selected = this.state.selected;
		selected.selectedExchange = value;
		this.setState({ selected });
	}
	onChangeCurrency(value) {
		this.setState({
			selectedCurrency: value
		});
		var selected = this.props.selected;
		selected.selectedCurrency = value;
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
			<Container>
				<Header
					{...this.props}
					title="Add Alert"
					hasBackButton={true}
					closeModal={this.props.closeModal}
				/>
				<Content>
					<Form>
						<View
							style={[
								styles.pickerViewExchange,
								styles.pickerView
							]}
						>
							<Text>
								Which Exchange is holding your currency?
							</Text>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="ios-arrow-down-outline" />}
								androidIcon={
									<Icon name="ios-arrow-down-outline" />
								}
								placeholder="Exchange"
								placeholderStyle={{ color: "#bfc6ea" }}
								placeholderIconColor="#007aff"
								style={{ width: 150 }}
								headerBackButtonText="X"
								selectedValue={this.state.selectedExchange}
								onValueChange={this.onChangeExchange.bind(this)}
							>
								{pickerItemsExchanges}
							</Picker>
						</View>
						{showCurrencySelector && (
							<View
								style={[
									styles.pickerViewCurrency,
									styles.pickerView
								]}
							>
								<Text>Which Currency are you holding?</Text>
								<Picker
									mode="dropdown"
									iosIcon={
										<Icon name="ios-arrow-down-outline" />
									}
									placeholder="Currency"
									placeholderStyle={{ color: "#bfc6ea" }}
									placeholderIconColor="#007aff"
									style={{ width: 150 }}
									selectedValue={this.state.selectedCurrency}
									onValueChange={this.onChangeCurrency.bind(
										this
									)}
								>
									{pickerItemsCurrencies}
								</Picker>
							</View>
						)}
						{showCurrencySelector &&
							selectedCurrency && (
								<View style={styles.inputView}>
									{/*<Slider />*/}
								</View>
							)}
					</Form>
				</Content>
				<Footer>
					<FooterTab>
						<Button
							full
							onPress={() =>
								this.props.navigation.navigate("AddToPortfolio")
							}
						>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	center: {
		alignItems: "center",
		justifyContent: "center"
	},
	currencyIconContainer: {
		alignItems: "center",
		justifyContent: "center"
	},
	currencyIcon: {
		width: 32,
		height: 32
	},
	singleHolding: {
		padding: 10
	}
});
