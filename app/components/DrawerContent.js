import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { List, ListItem, Text } from "native-base";

export default class DrawerContent extends Component {
	goToScreen(screenName) {
		this.props.navigation.navigate(screenName);
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
				<List>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Home")}
					>
						<Text style={styles.drawerText}>Home</Text>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Portfolio")}
					>
						<Text style={styles.drawerText}>Portfolio</Text>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("News")}
					>
						<Text style={styles.drawerText}>News</Text>
					</ListItem>
					<ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("MarketCap")}
					>
						<Text style={styles.drawerText}>Market Cap</Text>
					</ListItem>
					{/* <ListItem
						style={styles.listItem}
						button
						onPress={() => this.goToScreen("Settings")}
					>
						<Text style={styles.drawerText}>Settings</Text>
				</ListItem> */}
				</List>
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
		textAlign: "right"
	},
	listItem: {
		borderBottomWidth: 0
	}
});
