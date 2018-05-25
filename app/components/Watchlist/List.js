import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container } from "native-base";

class SingleHolding extends Component {
	render() {
		return (
			<View style={styles.singleHolding}>
				<Grid>
					<Col style={styles.currencyIconContainer}>
						<Image
							source={{
								uri: `https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${this.props.coin.toLowerCase()}.png`
							}}
							style={styles.currencyIcon}
						/>
					</Col>
					<Col style={styles.center}>
						<Text>Zebpay</Text>
					</Col>
					<Col style={styles.center}>
						<Text>&#8377; 200</Text>
					</Col>
				</Grid>
			</View>
		);
	}
}

export default class List extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SingleHolding coin="BTC" />
				<SingleHolding coin="LTC" />
				<SingleHolding coin="XRP" />
			</View>
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
