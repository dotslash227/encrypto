import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Footer, FooterTab, Button, Content } from "native-base";
import Header from "../../components/Header";

export default class AddModal extends Component {
	render() {
		return (
			<Container>
				<Header
					{...this.props}
					title="Add Alert"
					hasBackButton={true}
					closeModal={this.props.closeModal}
				/>
				<Content />
				<Footer>
					<FooterTab>
						<Button
							full
							onPress={() =>
								this.props.navigation.navigate("AddToPortfolio")
							}
						>
							<Text>Add</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
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
