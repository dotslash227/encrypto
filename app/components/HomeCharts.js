import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Content, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
	VictoryChart,
	VictoryArea,
	VictoryAxis,
	VictoryTheme
} from "victory-native";

export default class HomeCharts extends Component {
	render() {
		const sampleData = [{ x: 0, y: 2 }, { x: 2, y: 5 }];
		return (
			<View>
				<Info />
				<VictoryChart theme={VictoryTheme.material}>
					<VictoryArea data={sampleData} />
					<VictoryAxis />
				</VictoryChart>
			</View>
		);
	}
}

class Info extends Component {
	render() {
		return (
			<Grid style={styles.infoContainer}>
				<Col>
					<Text style={styles.bigText}>50</Text>
					<Text style={styles.smallText}>XRP/INR Price</Text>
				</Col>
				<Col>
					<Text style={styles.bigText}>6.3</Text>
					<Text style={styles.smallText}>11.49% since yesterday</Text>
				</Col>
			</Grid>
		);
	}
}

const styles = StyleSheet.create({
	infoContainer: {
		padding: 10
	},
	bigText: {
		fontSize: 20
	},
	smallText: {
		fontSize: 14
	}
});
