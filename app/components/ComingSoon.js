import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
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

export default class ComingSoon extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Icon name="md-build" style={styles.icon} />
				<Text style={styles.text}>Coming Soon</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	icon: {
		fontSize: 100,
		color: "#DDD"
	},
	text: {
		color: "#333",
		fontSize: 22,
		paddingTop: 10
	}
});
