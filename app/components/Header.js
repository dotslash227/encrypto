import React, { Component } from "react";
import { View } from "react-native";
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Button,
	Icon,
	Title,
	Text
} from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";

export default class MainHeader extends Component {
	render() {
		let hasTabs = false;
		if (this.props.hasTabs) hasTabs = true;
		let hasBackButton = this.props.hasBackButton ? true : false;
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
				<Button transparent onPress={() => this.props.navigation.goBack()}>
					<Icon name="md-arrow-back" />
				</Button>
			);
		}

		return (
			<Header hasTabs={hasTabs}>
				<Left>{leftSection}</Left>
				<Body>
					<Title>{this.props.title || "Encrypto"}</Title>
				</Body>
				<Right />
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
				<Button transparent onPress={() => this.props.navigation.goBack()}>
					<Icon name="md-arrow-back" />
				</Button>
			);
		}

		return (
			<Header hasTabs={hasTabs}>
				<Left>{leftSection}</Left>
				<Body>
					<Title>{this.props.title || "Encrypto"}</Title>
				</Body>
				<Right>
					<Button
						transparent
						onPress={() => this.setState({ countryModalVisible: true })}
					>
						<Icon name="md-flag" />
					</Button>
					<Button transparent onPress={() => this.props.refreshScreen()}>
						<Icon name="md-refresh" />
					</Button>
				</Right>
				<ModalFilterPicker
					visible={this.state.countryModalVisible}
					onSelect={this.onSelect}
					onCancel={() => this.setState({ countryModalVisible: false })}
					options={this.state.countryModalOptions}
				/>
			</Header>
		);
	}
}
