import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Button,
	Icon,
	Title,
	Text,
} from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";

export default class MainHeader extends Component {
	render() {
		let hasTabs = false;
		if (this.props.hasTabs) hasTabs = true;
		let hasBackButton = this.props.hasBackButton ? true : false;
		let hasSearch = this.props.hasSearch ? true : false;
		let leftSection = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate("DrawerOpen")}
			>
				<Icon name="md-menu" />
			</Button>
		);
		let rightSection;
		if (hasBackButton) {
			if (this.props.closeModal) {
				leftSection = (
					<Button transparent onPress={() => this.props.closeModal()}>
						<Icon name="md-arrow-back" />
					</Button>
				);
			} else {
				leftSection = (
					<Button
						transparent
						onPress={() => this.props.navigation.goBack()}
					>
						<Icon name="md-arrow-back" />
					</Button>
				);
			}
		} else if(hasSearch) {
			rightSection = (
				<Button
						transparent
						onPress={() => this.props.showSearch()}
					>
						<Icon name="md-search" />
					</Button>
			)
		}

		return (
				<Header hasTabs={hasTabs} style={{backgroundColor:"#021B79"}}>
					<Left>{leftSection}</Left>
					<Body>
						<Title>{this.props.title || "Encrypto"}</Title>
					</Body>
					<Right>{rightSection}</Right>
				</Header>
		);
	}
}

export class HomeHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countryModalVisible: false,
			countryModalOptions: []
		};
		this.onSelect = this.onSelect.bind(this);
	}
	componentDidMount() {
		console.log({ props: this.props, state: this.state });
		const countries = [
			{
				key: "IN",
				label: "India"
			}
		];
		this.setState({ countryModalOptions: countries });
	}
	onSelect(value) {
		let selectedProps = JSON.parse(JSON.stringify(this.props.selected));
		selectedProps.country = value;
		this.props.changeSelection({ selected: selectedProps });
		this.setState({ countryModalVisible: false });
		console.log({ state: this.props.selected });
	}
	render() {
		let hasTabs = false;
		if (this.props.hasTabs) hasTabs = true;
		let hasBackButton = this.props.hasBackButton ? true : false;
		// let hasCountryFlag = this.state.selected.countryImage ? true : false;
		let leftSection = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate("DrawerOpen")}
			>
				<Icon name="md-menu" />
			</Button>
		);
		if (hasBackButton) {
			leftSection = (
				<Button
					transparent
					onPress={() => this.props.navigation.goBack()}
				>
					<Icon name="md-arrow-back" />
				</Button>
			);
		}

		return (
			<Header hasTabs={hasTabs} style={{backgroundColor:"#021B79"}}>
				<Left>{leftSection}</Left>
				<Body>
					<Title>{this.props.title || "Encrypto"}</Title>
				</Body>
				<Right>
					<Button
						transparent
						onPress={() =>
							this.setState({ countryModalVisible: true })
						}
					>
						<Image source={require("../assets/india.png")}
						style={{height:20, width:20, marginTop:4, marginRight:-15}}
						name="md-flag" />
						<Icon name="" />
					</Button>
					<Button
						transparent
						onPress={() => this.props.refreshScreen()}
					>
						<Icon name="md-refresh" />
					</Button>
				</Right>
				<ModalFilterPicker
					visible={this.state.countryModalVisible}
					onSelect={this.onSelect}
					onCancel={() =>
						this.setState({ countryModalVisible: false })
					}
					options={this.state.countryModalOptions}
				/>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%"
	}
})
