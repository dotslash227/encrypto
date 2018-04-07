import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
	Container,
	Content,
	Button,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch,
	Header,
	H1,
	H2,
	H3
} from "native-base";

import config from "../config.json";
import { loginUser } from "../utils/common";

import { NavigationActions } from "react-navigation";

// Facebook
import { LoginManager, AccessToken } from "react-native-fbsdk";

class LoginHeader extends Component {
	render() {
		return (
			<Header style={styles.loginHeader} hasTabs>
				<Right>
					<Button
						transparent
						large
						onPress={() => this.props.navigation.goBack()}
					>
						<Icon
							style={{ color: "#333", fontSize: 40 }}
							name="md-close"
						/>
					</Button>
				</Right>
			</Header>
		);
	}
}

export default class Login extends Component {
	login(source) {
		console.log({ source });
		if (source === "facebook") this.loginFacebook();
	}

	sendToHome() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "Home" })]
		});
		this.props.navigation.dispatch(resetAction);
		this.props.navigation.navigate("Home");
	}

	loginFacebook() {
		var main = this;
		LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
			function(result) {
				if (result.isCancelled) {
					console.log("Modal cancelled");
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const accessToken = data.accessToken.toString();
						fetch(
							`${
								config.api.base
							}/api/auth/facebook?accesstoken=${accessToken}`,
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
								if (response.success) {
									loginUser(
										{
											userId: response.user.id,
											name: response.user.name
										},
										() => {
											main.sendToHome();
										}
									);
								} else {
									console.log("Not success true", response);
									alert("Something went wrong");
								}
							});
					});
				}
			},
			function(error) {
				console.log("Login fail with error: " + error);
				alert("Something went wrong");
			}
		);
	}

	render() {
		return (
			<Container>
				<LoginHeader {...this.props} />
				<Content style={styles.content}>
					<H1 style={[styles.h1, styles.textCenter]}>Login</H1>
					<H3 style={[styles.h3, styles.textCenter]}>
						Please Login To Continue
					</H3>
					<Text style={[styles.textCenter]}>
						Create an Account or Login to an existing account:
					</Text>
					<View style={styles.buttonGroup}>
						<Button
							block
							iconLeft
							style={styles.loginFacebook}
							onPress={() => this.login("facebook")}
						>
							<Icon name="logo-facebook" />
							<Text>Facebook</Text>
						</Button>
						<Button
							block
							iconLeft
							style={styles.loginGoogle}
							onPress={() => this.login("google")}
						>
							<Icon name="logo-google" />
							<Text>Facebook</Text>
						</Button>
						<Button
							block
							iconLeft
							style={styles.loginAccountKit}
							onPress={() => this.login("accountkit")}
							light
						>
							<Text>Email / Phone</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		padding: 10
	},
	loginHeader: {
		backgroundColor: "#fff"
	},
	textCenter: {
		textAlign: "center"
	},
	h1: {
		textAlign: "center",
		paddingBottom: 10
	},
	h3: {
		paddingBottom: 10
	},
	buttonGroup: {
		padding: 20,
		marginTop: 40
	},
	loginFacebook: {
		marginBottom: 10
	},
	loginGoogle: {
		marginBottom: 10,
		backgroundColor: "#dd4b39"
	}
});
