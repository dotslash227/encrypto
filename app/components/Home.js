import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Content, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export class PickerHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getExchange() {
		let exchanges = this.props.exchanges;
		let exchange = exchanges.filter(
			exchange => exchange.code === this.props.selected.exchange
		);
		//console.log(exchange);
		if (exchange.length > 0) return <Text>{exchange[0].displayName}</Text>;
		else return <Text>{this.props.selected.exchange}</Text>;
	}

	render() {
		return (
			<Row style={styles.pickerOne}>
				<Grid>
					<Col>
						<Button transparent dark iconRight>
							<Text>{this.props.selected.currency}</Text>
							<Icon name="ios-arrow-down" />
						</Button>
					</Col>
					<Col>
						<Button transparent dark iconRight>
							{this.getExchange()}
							<Icon name="ios-arrow-down" />
						</Button>
					</Col>
				</Grid>
			</Row>
		);
	}
}

const styles = StyleSheet.create({
	pickerOne: {
		backgroundColor: "#888",
		height: 50
	}
});
