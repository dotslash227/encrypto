import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container } from "native-base";

export default class PortfolioValue extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Grid>
					<Col>
						<Text style={styles.smallText}>Total Portfolio Value</Text>
						<Text style={styles.largeText}>&#8377; {this.props.value}</Text>
					</Col>
					<Col>
						<Text style={[styles.rightAligned, styles.smallText]}>
							24hr Change
						</Text>
						<Text style={[styles.rightAligned, styles.largeText]}>
							{this.props.change}
						</Text>
					</Col>
				</Grid>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#324152"
	},
	smallText: {
		//lineHeight: 1
		fontSize: 14,
		color: "#fff"
	},
	largeText: {
		fontSize: 20,
		color: "#fff",
		paddingTop: 10
	},
	rightAligned: {
		textAlign: "right"
	}
});
