import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Body, Right, Icon } from "native-base";

import config from "../config.json";

import { getLocalUser } from "../utils/common";

export default class DrawerContent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			user: null
		};
	}

	goToScreen(screenName) {
		const { loggedIn, user } = this.state;
		const nonAuthScreens = [
			"Home",
			"Settings",
			"MarketCap",
			"News",
			"Events"
		];
		if (nonAuthScreens.indexOf(screenName) > -1) {
			this.props.navigation.navigate(screenName, { loggedIn, user });
		} else if (loggedIn) {
			// User is logged in, let them pass
			this.props.navigation.navigate(screenName, { loggedIn, user });
		} else {
			// User is not logged in, send them to Login
			this.props.navigation.navigate("Login", { loggedIn, user });
		}
	}

	componentDidMount() {
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in");
				this.setState({ loggedIn: true, user });
			} else {
				console.log("User is not logged in");
			}
		});
	}

	render() {
		return (
			<View style={styles.mainDrawer}>
				<Image
					source={{
						uri:
							"https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
					}}
					style={{
						height: 120,
						alignSelf: "stretch",
						justifyContent: "center",
						alignItems: "center"
					}}
				/>
				<List style={styles.menuGroup}>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Home")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Home</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
				</List>
				<List style={styles.menuGroup}>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Portfolio")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Portfolio</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Portfolio")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Watchlist</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("MarketCap")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>
								Market Capital
							</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("News")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>News</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("News")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>
								Blockchain Events
							</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
				</List>
				<List style={styles.menuGroup}>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Settings")}
						icon
					>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Settings</Text>
						</Body>
						<Right style={styles.removeBorder}>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
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
		backgroundColor: "#393E46",
		flex: 1
	},
	drawerText: {
		color: "#f5f5f5",
		textAlign: "left"
	},
	listItem: {
		borderBottomWidth: 0
	},
	menuGroup: {
		backgroundColor: "#222831",
		marginBottom: 10,
		borderBottomWidth: 0
	},
	removeBorder: {
		borderBottomWidth: 0
	},
	drawerFooter: {},
	drawerFooterText: {
		textAlign: "center",
		color: "#fff"
	}
});
