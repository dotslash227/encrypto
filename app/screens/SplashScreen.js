import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { HomeHeader } from "../components/Header";
import { PickerHeader } from "../components/Home";
import HomeCharts from "../components/HomeCharts";

import {
	List,
	ListItem,
	Text,
	Content,
	Container,
	Footer,
	FooterTab,
	Button,
	Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class SplashScreen extends Component {

	render() {
		return (
			<Container style={styles.splashCont}>
				<Image
				source={require('../assets/splashLogo.png')}
			style={styles.splashImage}
			  />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	splashImage: {
		width: 150,
		height: 150
	},
	splashCont: {
		alignItems: "center",
		justifyContent: "center"
	}
});
