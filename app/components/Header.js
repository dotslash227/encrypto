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
