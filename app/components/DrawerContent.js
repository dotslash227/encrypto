import React, { Component } from "react";
import { View, Image } from "react-native";
import { List, ListItem, Text } from "native-base";

export default class DrawerContent extends Component {
	goToScreen(screenName) {
		this.props.navigation.navigate(screenName);
	}
	render() {
		return (
			<View>
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
					<ListItem button onPress={() => this.goToScreen("Home")}>
						<Text>Home</Text>
					</ListItem>
					<ListItem button onPress={() => this.goToScreen("Portfolio")}>
						<Text>Portfolio</Text>
					</ListItem>
					<ListItem button onPress={() => this.goToScreen("News")}>
						<Text>News</Text>
					</ListItem>
					<ListItem button onPress={() => this.goToScreen("Settings")}>
						<Text>Settings</Text>
					</ListItem>
				</List>
			</View>
		);
	}
}
