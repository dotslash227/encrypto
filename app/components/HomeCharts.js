import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
	List,
	ListItem,
	Text,
	Content,
	Button,
	Icon,
	Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
	VictoryChart,
	VictoryArea,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
	VictoryLine
} from "victory-native";

import config from "../config.json";
import { formatRate } from "../utils/common";
import moment from "moment";

export default class HomeCharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: null,
			curOneData: null,
			curTwoData: null
		};
	}

	fetchCurData(curCode, exCode, callback) {
		fetch(
			`${
				config.api.base
			}/api/rates/exchange/currency?exchangeCode=${exCode.toUpperCase()}&currencyCode=${curCode.toUpperCase()}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.json())
			.then(response => {
				if (response && response.success) return callback(null, response);
				else return callback("Something Went Wrong", null);
			})
			.catch(e => {
				console.log(e);
				return callback("Something Went Wrong", null);
			});
	}

	componentDidMount() {
		const { selected } = this.props;
		const { curOneData, curTwoData } = this.state;
		// Get For First Currency / Exchange
		this.fetchCurData(selected.currency, selected.exchange, (err, data) => {
			console.log({ err, data });
			if (err) this.setState({ loading: false, error: err });
			else this.setState({ loading: false, curOneData: data.rates });
		});
	}

	componentWillReceiveProps(nextProps) {
		const { selected } = nextProps;
		const { curOneData, curTwoData } = this.state;
		this.setState({ loading: true });
		this.fetchCurData(selected.currency, selected.exchange, (err, data) => {
			if (err) this.setState({ loading: false, error: err });
			else this.setState({ loading: false, curOneData: data.rates });
		});
		this.fetchCurData(selected.currency, selected.exchangeTwo, (err, data) => {
			if (err) this.setState({ loading: false, error: err });
			else this.setState({ loading: false, curTwoData: data.rates });
		});
	}

	render() {
		const { loading, error, curOneData, curTwoData } = this.state;
		const { selected } = this.props;
		if (loading) {
			return <Spinner />;
		}
		const sampleData = [{ x: 0, y: 2 }, { x: 1, y: 5 }];
		const sampleData2 = [{ x: 0, y: 3 }, { x: 1, y: 10 }];
		const chartData = curOneData.map(data => {
			return {
				x: parseInt(moment(data.created).format("H")),
				y: data.rate
			};
		});
		let chartTwoData;
		if (curTwoData && curTwoData.length > 0) {
			chartTwoData = curTwoData.map(data => {
				return {
					x: parseInt(moment(data.created).format("hh")),
					y: data.rate
				};
			});
		}
		console.log({ chartData, chartTwoData });
		return (
			<View>
				<Info {...this.props} {...this.state} />
				<View style={styles.chartContainer}>
					{selected.isComparing ? (
						<VictoryChart>
							<VictoryLine
								data={chartData}
								style={{
									data: { stroke: "#375A7F", fillOpacity: 0, strokeWidth: 5 }
								}}
							/>
							<VictoryLine
								data={chartTwoData}
								style={{
									data: { stroke: "#FCFA70", fillOpacity: 0, strokeWidth: 5 }
								}}
							/>
						</VictoryChart>
					) : (
						<VictoryChart>
							<VictoryLine
								data={chartData}
								style={{
									data: { stroke: "#375A7F", fillOpacity: 0, strokeWidth: 5 }
								}}
								scale={{ x: "linear", y: "linear" }}
							/>
						</VictoryChart>
					)}
				</View>
				{/* <VictoryAxis crossAxis={false} /> */}
			</View>
		);
	}
}

class Info extends Component {
	render() {
		const { selected, curOneData, curTwoData } = this.props;
		const curOneRate = curOneData[0];
		//const curOneRateYesterday = curOneData[curOneData.length - 1];
		const curOneFilter = this.props.exchanges.filter(
			e => e.code === selected.exchange.toUpperCase()
		);
		const curOneExName = curOneFilter[0].displayName;
		// curTwo
		let curTwoRate;
		let curTwoExName;
		if (selected.isComparing && curTwoData && curTwoData.length > 0) {
			console.log({ curTwoRate: curTwoData[0] });
			curTwoRate = curTwoData[0];
			let curTwoFilter = this.props.exchanges.filter(
				e => e.code === selected.exchangeTwo.toUpperCase()
			);
			curTwoExName = curTwoFilter[0].displayName;
		}
		return (
			<Grid style={styles.infoContainer}>
				<Col>
					<Text style={styles.bigText}>
						&#8377; {formatRate(curOneRate.rate)}
					</Text>
					<Text style={styles.smallText}>
						{curOneRate.currencyCode}/INR Price
					</Text>
					<Text style={styles.smallText}>{curOneExName}</Text>
				</Col>
				{selected.isComparing && curTwoRate ? (
					<Col>
						<Text style={styles.bigText}>
							&#8377; {formatRate(curTwoRate.rate)}
						</Text>
						<Text style={styles.smallText}>
							{curTwoRate.currencyCode}/INR Price
						</Text>
						<Text style={styles.smallText}>{curTwoExName}</Text>
					</Col>
				) : (
					<View />
				)}
			</Grid>
		);
	}
}

const styles = StyleSheet.create({
	infoContainer: {
		padding: 10
	},
	bigText: {
		fontSize: 20,
		textAlign: "center"
	},
	smallText: {
		fontSize: 14,
		textAlign: "center"
	},
	chartContainer: {
		padding: 20
	}
});
