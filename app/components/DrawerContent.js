import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text, Body, Right, Icon, Left } from "native-base";

import config from "../config.json";

import { getLocalUser } from "../utils/common";

export default class DrawerContent extends Component {
	constructor(props) {
		super(props);
	}

	goToScreen(screenName) {
		this.props.navigation.navigate(screenName);
	}

	componentDidMount() {}

	render() {
		return (
			<View style={styles.mainDrawer}>
				<View style={styles.profileArea}>
					<List>
						<ListItem style={styles.removeBorder}>
							<Left>
								<Image source={require("../assets/user.png")} style={{width:70, height:70}} />
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
						<Icon name="home" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Home</Text>
						</Body>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Portfolio")}
						icon
					>
					<Left>
						<Icon type="FontAwesome" name="fa-chart-pie" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Portfolio</Text>
						</Body>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Watchlist")}
						icon
					>
					<Left>
						<Icon type="FontAwesome" name="clock" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Watchlist</Text>
						</Body>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("MarketCap")}
						icon
					>
					<Left>
						<Icon type="MaterialIcons" name="monetization_on" style={styles.icon} />
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
						<Icon type="FontAwesome" name="news" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>News</Text>
						</Body>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Events")}
						icon
					>
					<Left>
						<Icon type="FontAwesome" name="news" style={styles.icon} />
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
						<Icon type="FontAwesome" name="news" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>ICO</Text>
						</Body>

					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Settings")}
						icon
					>
					<Left>
						<Icon type="FontAwesome" name="news" style={styles.icon} />
					</Left>
						<Body style={styles.removeBorder}>
							<Text style={styles.drawerText}>Settings</Text>
						</Body>

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
		backgroundColor: "#3174b3",
		height: 100
	}
});
