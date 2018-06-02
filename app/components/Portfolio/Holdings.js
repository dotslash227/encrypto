import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container } from "native-base";
import { formatRate } from "../../utils/common";

class SingleHolding extends Component {
	render() {
		const { data } = this.props;
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
						<Text>{this.props.exName}</Text>
					</Col>
					<Col style={styles.center}>
						<Text>&#8377; {formatRate(data.currentValue)}</Text>
					</Col>
				</Grid>
			</View>
		);
	}
}

export default class Holdings extends Component {

	render() {
		const { isEmpty, portfolio } = this.props;
		if(isEmpty) {
			return (
				<View style={styles.center}>
					<Text style={{ paddingTop: 20, fontSize: 20 }}>Nothing Here.</Text>
				</View>
			);
		}
		// Sort Portfolio:
		const sortedPortfolio = portfolio.sort((a, b) => b.created - a.created);
		const portfolioList = sortedPortfolio.map((data) => {
			let exName = this.props.exchanges.filter(e => e.code === data.exchangeCode)[0].displayName;
			return (
			  <SingleHolding coin={data.currencyCode} exName={exName} key={data._id} data={data.track} />
			)
		});
		return (
			<View style={styles.container}>
				{portfolioList}
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
