import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Content, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
	VictoryChart,
	VictoryArea,
	VictoryAxis,
	VictoryTheme,
	VictoryStack
} from "victory-native";

export default class HomeCharts extends Component {
	render() {
		const sampleData = [{ x: 0, y: 2 }, { x: 1, y: 5 }];
		const sampleData2 = [{ x: 0, y: 3 }, { x: 1, y: 10 }];
		return (
			<View>
				<Info />
				<VictoryChart>
					<VictoryStack theme={VictoryTheme.material}>
						<VictoryArea name="area-1" data={sampleData} />
						<VictoryArea name="area-2" data={sampleData2} />
					</VictoryStack>
					<VictoryAxis crossAxis={true} />
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
