import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
	List,
	ListItem,
	Text,
	Content,
	Button,
	Icon,
	Spinner,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
	VictoryChart,
	VictoryArea,
	VictoryAxis,
	VictoryTheme,
	VictoryStack,
	VictoryLine,
	VictoryLabel
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
			}/api/rates/graph?exchangeCode=${exCode.toUpperCase()}&currencyCode=${curCode.toUpperCase()}&type=${
				this.props.graph.range
			}`,
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
			if (err) console.log({ err, data });
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
		if (loading || !curOneData) {
			return <Spinner />;
		}
		const sampleData = [{ x: 0, y: 2 }, { x: 1, y: 5 }];
		const sampleData2 = [{ x: 0, y: 3 }, { x: 1, y: 10 }];
		const chartData = curOneData.map(data => {
			return {
				x: parseInt(moment(data.created).format("H")),
				y: data.buy
			};
		});
		let chartTwoData;
		if (selected.isComparing && curTwoData && curTwoData.length > 0) {
			chartTwoData = curTwoData.map(data => {
				return {
					x: parseInt(moment(data.created).format("H")),
					y: data.buy
				};
			});
		}
		return (
			<View style={{backgroundColor:"white"}}>
				<Info {...this.props} {...this.state} />
				<View style={styles.chartContainer}>
					{selected.isComparing ? (
						<VictoryChart>
							<VictoryLine
								data={chartData}
								style={{
									data: {
										stroke: "#375A7F",
										fillOpacity: 0,
										strokeWidth: 5
									}
								}}
							/>
							<VictoryLine
								data={chartTwoData}
								style={{
									data: {
										stroke: "#FCFA70",
										fillOpacity: 0,
										strokeWidth: 5
									}
								}}
							/>
						</VictoryChart>
					) : (
						<VictoryChart padding={50}>
							<VictoryLine
								data={chartData}
								style={{
									data: {
										stroke: "#375A7F",
										fillOpacity: 0,
										strokeWidth: 5
									}
								}}
								scale="time"
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
		const lastCurOne = curOneData[1];
		let buypercentage = ((curOneRate.rate - lastCurOne.rate)/100).toFixed(2)
		let percentage;
		if (buypercentage<0){
				percentage = (
					<Text style={{color:"red", textAlign:"center"}}>
						{buypercentage}%
					</Text>
				);
		} else{
			percentage = (
				<Text style={{color:"green", textAlign:"center"}}>
					+{buypercentage}%
				</Text>
			);
		}
		let sellPercentage = ((curOneRate.sell-lastCurOne.sell)/100).toFixed(2)
		let sellShow;
		if (buypercentage<0){
				sellShow = (
					<Text style={{color:"red", textAlign:"center"}}>
						{sellPercentage}%
					</Text>
				);
		} else{
			sellShow = (
				<Text style={{color:"green", textAlign:"center"}}>
					+{sellPercentage}%
				</Text>
			);
		}
		let buy2show;
		let sell2show;
		let showbuydiff;
		let showselldiff;
		//const curOneRateYesterday = curOneData[curOneData.length - 1];
		const curOneFilter = this.props.exchanges.filter(
			e => e.code === selected.exchange.toUpperCase()
		);
		const curOneExName = curOneFilter[0].displayName;
		// curTwo
		let curTwoRate;
		let curTwoExName;
		if (selected.isComparing && curTwoData && curTwoData.length > 0) {
			curTwoRate = curTwoData[0];
			lastCurTwo = curTwoData[1];
			const cur2buyPercent = ((curTwoRate.rate-lastCurTwo.rate)/100).toFixed(2)
			const cur2sellPercent = ((curTwoRate.sell-lastCurTwo.sell)/100).toFixed(2)
			let curTwoFilter = this.props.exchanges.filter(
				e => e.code === selected.exchangeTwo.toUpperCase()
			);

			if (cur2buyPercent<0){
					buy2show = (
						<Text style={{color:"red", textAlign:"center"}}>
							-{sellPercentage}%
						</Text>
					);
			} else{
				buy2show = (
					<Text style={{color:"green", textAlign:"center"}}>
						{sellPercentage}%
					</Text>
				);
			}
			if (cur2sellPercent<0){
					sell2show = (
						<Text style={{color:"red", textAlign:"center"}}>
							-{sellPercentage}%
						</Text>
					);
			} else{
				sell2show = (
					<Text style={{color:"green", textAlign:"center"}}>
							{sellPercentage}%
					</Text>
				);
			}
			curTwoExName = curTwoFilter[0].displayName;

			const buydiff = (curOneRate.rate-curTwoRate.rate).toFixed(2)
			const selldiff = (curOneRate.sell-curTwoRate.sell).toFixed(2)

			if (buydiff<0){
				showbuydiff = (
					<Text style={{color:"red", textAlign:"center"}}>
						{buydiff}
					</Text>
				);
			} else{
				showbuydiff = (<Text style={{color:"green", textAlign:"center"}}>
					{buydiff}
				</Text>);
			}

			if (selldiff<0){
				showselldiff = (
					<Text style={{color:"red", textAlign:"center"}}>
						{selldiff}
					</Text>
				);
			} else{
				showselldiff = (<Text style={{color:"green", textAlign:"center"}}>
					{selldiff}
				</Text>);
			}
		}



		if (!selected.isComparing){
			return (
				<Grid style={styles.infoContainer}>
					<Col style={styles.colBorder}>
						<Text style={styles.bigText}>
							Buy
						</Text>
						<Text style={styles.smallText}>
							{curOneRate.currencyCode}/INR
						</Text>
						<Text style={styles.smallText}>
							{formatRate(curOneRate.rate)}
						</Text>
					</Col>
					<Col style={styles.colBorder}>
						<Text style={styles.smallText}>
							Change 24 Hours
						</Text>
						{percentage}
					</Col>
					<Col style={styles.colBorder}>
						<Text style={styles.bigText}>
							Sell
						</Text>
						<Text style={styles.smallText}>
							{curOneRate.currencyCode}/INR
						</Text>
						<Text style={styles.smallText}>
							{formatRate(curOneRate.sell)}
						</Text>
					</Col>
					<Col>
						<Text style={styles.smallText}>
							Change 24 Hours
						</Text>
						{sellShow}
					</Col>
				</Grid>
			);
		}
		else {
			return(
				<Grid>
					<Row style={styles.compareRow}>
						<Col style={styles.colBorder}>
							<Text style={styles.smallText}>
								{selected.exchange}
							</Text>
							<Text style={styles.smallText}>
								{formatRate(curOneRate.buy)}
							</Text>
						</Col>
						<Col style={styles.colBorder}>
							<Text style={styles.smallText}>
								% change
							</Text>
							{percentage}
						</Col>
						<Col style={styles.colBorder}>
							<Text style={styles.smallText}>
								{selected.exchange}
							</Text>
							<Text style={styles.smallText}>
								{formatRate(curOneRate.sell)}
							</Text>
						</Col>
						<Col style={styles.colBorder}>
							<Text style={styles.smallText}>
								% change
							</Text>
							{sellShow}
						</Col>
					 </Row>
					 <Row style={styles.compareRow}>
						 <Col style={styles.colBorder}>
							 <Text style={styles.smallText}>
								 {selected.exchangeTwo}
							 </Text>
							 <Text style={styles.smallText}>
								 {formatRate(curOneRate.buy)}
							 </Text>
						 </Col>
						 <Col style={styles.colBorder}>
							 <Text style={styles.smallText}>
								 % change
							 </Text>
							 {buy2show}
						 </Col>
						 <Col style={styles.colBorder}>
							 <Text style={styles.smallText}>
								 {selected.exchangeTwo}
							 </Text>
							 <Text style={styles.smallText}>
								 {formatRate(curOneRate.sell)}
							 </Text>
						 </Col>
						 <Col style={styles.colBorder}>
							 <Text style={styles.smallText}>
								 % change
							 </Text>
							 {sell2show}
						 </Col>
					 </Row>
					 <Row>
					 	<Col style={styles.colBorder}>
							<Text style={styles.smallText}>Buy Diff.</Text>
						</Col>
						<Col style={styles.colBorder}>
							{showbuydiff}
						</Col>
						<Col style={styles.colBorder}>
							<Text style={styles.smallText}>Sell Diff.</Text>
						</Col>
						<Col style={styles.colBorder}>
							{showselldiff}
						</Col>
					 </Row>
					</Grid>
			);
		}
	}
}

const styles = StyleSheet.create({
	compareRow:{
		borderBottomColor: "black",
		borderBottomWidth: 1
	},
	compareText: {
		borderBottomColor: "black",
		borderBottomWidth: 1,
		fontSize: 14,
	},
	colBorder:{
		borderRightColor: "black",
		borderRightWidth: 1,
		paddingLeft: 5,
	},
	infoContainer: {
		padding: 10,
		backgroundColor: "white"
	},
	bigText: {
		fontSize: 20,
		textAlign: "center",
		color: "#324152",
		fontWeight: "bold"
	},
	smallText: {
		fontSize: 14,
		textAlign: "center",
		color: "#324152"
	},
	chartContainer: {
		padding: 5
	}
});
