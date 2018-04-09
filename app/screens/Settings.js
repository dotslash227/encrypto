import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import {
	Container,
	Content,
	List,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch
} from "native-base";

import config from "../config.json";
import { logoutUser, getLocalUser } from "../utils/common";
import { NavigationActions } from "react-navigation";

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			user: null
		};
	}

	logout() {
		logoutUser(() => {
			//alert("Logged Out");
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: "Intro" })]
			});
			this.props.navigation.dispatch(resetAction);
			this.props.navigation.navigate("Intro");
		});
	}

	componentWillMount() {
		getLocalUser((err, user) => {
			if (user) {
				console.log("User is logged in", user);
				this.setState({ loggedIn: true, user });
			}
		});
	}

	render() {
		const { loggedIn } = this.state;
		let logoutButton = <View />;
		if (loggedIn) {
			logoutButton = (
				<List style={styles.singleList}>
					<ListItem icon onPress={() => this.logout()}>
						<Body>
							<Text>Logout</Text>
						</Body>
						<Right>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
				</List>
			);
		}

		return (
			<Container>
				<Header {...this.props} title="Settings" />
				<Content style={styles.content}>
					<List style={styles.singleList}>
						<ListItem icon>
							<Body>
								<Text>Feedback / Support</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>About Us</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
					</List>

					<List style={styles.singleList}>
						<ListItem icon>
							<Body>
								<Text>Rate Us</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>{config.displayVersion}</Text>
							</Body>
						</ListItem>
					</List>

					{logoutButton}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#F0EFF5"
	},
	singleList: {
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: "#fff"
	}
});
