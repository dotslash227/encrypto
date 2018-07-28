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

	componentDidMount() {
		/* setTimeout(()=>{
			console.log("I do not leak");
		}, 2500); */
	}

	render() {
		return (
				<View style={styles.splashCont}>
					<Image source={require('../assets/splash.png')} style={styles.splashImage}>
					</Image>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	splashImage: {
		height: 350,
		width: 350
	},
	splashCont: {
		flex: 1,
		backgroundColor: "#021B79",
		justifyContent: "center",
		alignItems: "center",
	}
});
