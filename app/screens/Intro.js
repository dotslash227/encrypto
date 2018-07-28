import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Spinner } from "native-base";
import SplashScreen from "./SplashScreen";

const styles = StyleSheet.create({
	buttons:{
		width:75,
		height: 35,
		padding: 5,
		backgroundColor: "white",
		flex: 1,
	},
	buttonText:{
		color:"#3174b3",
		textAlign: "center",
		fontSize: 16
	},
	image: {
		width: "115%",
		height: "115%",
		resizeMode: "cover"
	},
	text: {
		color: "#333",
		backgroundColor: "transparent",
		textAlign: "center",
		paddingHorizontal: 16
	},
	title: {
		fontSize: 22,
		color: "#000000",
		backgroundColor: "transparent",
		textAlign: "center",
		marginBottom: 16
	}
});

const slides = [
	{
		key: "somethun",
		image: require("./../assets/intro1.png"),
		imageStyle: styles.image,
		backgroundColor: "#317fb3",
		textStyle: styles.text,
		titleStyle: styles.title
	},
	{
		key: "somethun-dos",
		image: require("./../assets/intro1.png"),
		imageStyle: styles.image,
		backgroundColor: "#317fb3",
		textStyle: styles.text,
		titleStyle: styles.title
	},
	{
		key: "somethun1",
		image: require("./../assets/intro1.png"),
		imageStyle: styles.image,
		backgroundColor: "#317fb3",
		textStyle: styles.text,
		titleStyle: styles.title
	}
];

export default class Intro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	_renderNextButton = () => {
		return (
			<View style={styles.buttons}>
				<Text style={styles.buttonText}>Next</Text>
			</View>
		);
	}

	_renderSkipButton = () => {
		return (
			<Text style={{fontSize:17, marginTop:-5, color:"white"}}>Skip</Text>
		);
	}

	_renderDoneButton = () => {
		return (
			<View style={styles.buttons}>
				<Text style={styles.buttonText}>Done</Text>
			</View>
		);
	}

	componentWillMount() {
		// Exp: Load Currencies, etc
	}

	componentDidMount() {

		var _this = this;

		let containers = ["availableCurrencies", "exchanges", "currencies"];
		containers.forEach(container => {
			storage
				.load({
					key: container,
					autoSync: true,
					syncInBackground: true
				})
				.then(ret => {
					console.log("Saved All Cache");
				})
				.catch(e => console.log(e));
		});

		//this.props.navigation.navigate("Home");

		storage
			.load({ key: "introScreen" })
			.then(data => {
				_this.setState({ loading: false });
				if (data && data.seen) {
					_this.props.navigation.navigate("Home");
				}
			})
			.catch(e => {
				// Not found
				console.log("loaded data: error", e);
				_this.setState({ loading: false });
				console.log({ e });
			});
		
	}

	markAsSeen = () => {
		storage.save({
			key: "introScreen", // Note: Do not use underscore("_") in key!
			expires: null,
			data: {
				seen: true
			}
		});
	};

	_onDone = () => {
		this.markAsSeen();
		this.props.navigation.navigate("Home");
	};

	_onSkip = () => {
		this.markAsSeen();
		this.props.navigation.navigate("Home");
	};
	render() {
		let { loading } = this.state;
		console.log({loading});
		if (loading && loading === true) {
			console.log("Loading Intro");
			return <SplashScreen />;
		}
		return (
			<AppIntroSlider
				slides={slides}
				onDone={this._onDone}
				onSkip={this._onSkip}
				showSkipButton={true}
				renderNextButton = {this._renderNextButton}
				renderSkipButton = {this._renderSkipButton}
				renderDoneButton = {this._renderDoneButton}
			/>
		);
	}
}
