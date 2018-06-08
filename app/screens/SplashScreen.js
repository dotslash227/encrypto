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
		setTimeout(()=>{
			console.log("I do not leak");
		}, 2500);
	}

	render() {
		return (
				<Image source={require('../assets/splashScreen.png')} style={styles.splashCont}>
				</Image>
		);
	}
}

const styles = StyleSheet.create({
	splashImage: {
		flex: 1,
		resizeMode: "contain",
		justifyContent: "flex-start"
	},
	splashCont: {
		flex: 1,
		backgroundColor: "#266daf",
		justifyContent: "center",
		alignItems: "center",
		width: null,
		height: null,
		resizeMode: "cover"
	}
});
