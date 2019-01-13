import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { List, ListItem, Text, Body, Right, Icon, Left } from "native-base";

import config from "../config.json";

import { getLocalUser } from "../utils/common";
import Instabug from 'instabug-reactnative';

export default class DrawerContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			user: null
		};
	}

	componentWillMount() {
		Instabug.startWithToken('04c9efb1be90c705fbaf774d5df01e8d', [Instabug.invocationEvent.shake]);
	}

	goToScreen(screenName) {
		this.props.navigation.navigate(screenName);
	}

	componentDidMount() {
		var _this = this;
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in", user);
				_this.setState({ loggedIn: true, user });
			} else {
				console.log("User is not logged in");
			}
		});
	}

	tapOnProfile() {
		if(!this.state.loggedIn) {
			this.props.navigation.navigate("Login");
		}
	}

	tapSupport() {
		//Instabug.invoke();
	}

	render() {
		return (
			<View style={styles.mainDrawer}>
				<View style={styles.profileArea}>
					<List>
						<ListItem style={styles.removeBorder}>
							<Left>
								<TouchableOpacity onPress={() => this.tapOnProfile()}>
									<Image source={require("../assets/User-Profile-New.png")} style={{width:70, height:70}} />
								</TouchableOpacity>
							</Left>
						</ListItem>
					</List>
				</View>
				<List style={styles.menuGroup}>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Home")}
						icon
					>
					<Left>
						<Icon name="home" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Home</Text>
						</Body>
					</ListItem>
					{/* <ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Portfolio")}
						icon
					>
					<Left>
						<Icon name="ios-home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Portfolio</Text>
						</Body>
					</ListItem> */}
					{/* <ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Watchlist")}
						icon
					>
					<Left>
						<Icon  name="ios-home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Watchlist</Text>
						</Body>
					</ListItem> */}
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("MarketCap")}
						icon
					>
					<Left>
						<Icon name="bar-graph" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>
								Market Capital
							</Text>
						</Body>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("News")}
						icon
					>
					<Left>
						<Icon name="news" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>News</Text>
						</Body>
					</ListItem>
					{/* <ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Events")}
						icon
					>
					<Left>
						<Icon  name="ios-home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>
								Blockchain Events
							</Text>
						</Body>

					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("ICO")}
						icon
					>
					<Left>
						<Icon  name="ios-home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>ICO</Text>
						</Body>

					</ListItem> */}
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("About")}
						icon
					>
					<Left>
						<Icon name="users" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>About</Text>
						</Body>

					</ListItem>

					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.tapSupport()}
						icon
					>
					<Left>
						<Icon name="help-with-circle" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Support</Text>
						</Body>

					</ListItem>

					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("RateUs")}
						icon
					>
					<Left>
						<Icon name="heart" type="Entypo" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Rate Us</Text>
						</Body>

					</ListItem>

					{/* <ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("TestScreen")}
						icon
					>
					<Left>
						<Icon  name="ios-home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>TestScreen</Text>
						</Body>

					</ListItem> */}

				</List>
				<View style={styles.drawerFooter}>
					<Text style={styles.drawerFooterText}>
						{config.displayVersion}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainDrawer: {
		backgroundColor: "white",
		flex: 1
	},
	drawerText: {
		color: "black",
		textAlign: "left"
	},
	listItem: {
		borderBottomWidth: 0
	},
	menuGroup: {
		backgroundColor: "white",
		marginTop: 5,
		marginBottom: 10,
		borderBottomWidth: 0,
		borderBottomColor: "grey",
		paddingBottom: 10
	},
	removeBorder: {
		borderBottomWidth: 0
	},
	drawerFooter: {},
	drawerFooterText: {
		textAlign: "center",
		color: "#fff"
	},
	icon:{
		color: "#3174b3"
	},
	profileArea: {
		backgroundColor: "#021B79",
		height: 100
	}
});
