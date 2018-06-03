import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
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

// Account Kit
import RNAccountKit from "react-native-facebook-account-kit";

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
						<Icon style={{ color: "#333", fontSize: 40 }} name="md-close" />
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
		else if (source === "accountkit") this.loginAccountKit();
		else if (source === "guest") this.sendToHome();
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
							`${config.api.base}/api/auth/facebook?accesstoken=${accessToken}`,
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
											name: response.user.name,
											token: response.token
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

	loginAccountKit() {
		var main = this;
		RNAccountKit.loginWithEmail().then(token => {
			if (!token) {
				console.log("Login cancelled");
			} else {
				var accessToken = token.token;
				console.log({ akToken: accessToken });
				fetch(
					`${config.api.base}/api/auth/accountkit?accesstoken=${accessToken}`,
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
									name: response.user.name,
									token: response.token
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
			}
		});
	}

	render() {
		return (
			<ImageBackground source={require('../assets/bgimage.png')} style={styles.backgroundImage}>
				<Image source={require("../assets/logo.png")} style={styles.logo} />
				<View style={styles.buttonGroup}>
					<Button
						block
						iconLeft
						style={styles.loginAccountKit}
						onPress={() => this.login("accountkit")}
						light
					>
						<Text style={{fontSize:12}}>Signup via Email Authenticator</Text>
					</Button>
					<Button
						block
						iconLeft
						style={styles.loginGuest}
						>
						<Icon name="contacts" style={{color:"black"}}
						onPress = {()=>this.login("guest")}/>
						<Text style={{color:"black", fontSize:12}}>Continue as guest</Text>
					</Button>
				</View>

				<View style={styles.footerParent}>
					<Text style={{color:"white", fontSize: 12, marginBottom:10}}>Or login with</Text>
					<View style={styles.footer}>
						<Image source={require("../assets/fblogo.png")}
							style={styles.fbImage}
							onPress={()=> this.login("facebook")}
						/>
						<Image source={require("../assets/googlelogin.png")}
							style={styles.fbImage}
							onPress={()=>this.login("google")}
						/>
						<Image source={require("../assets/twitterlogin.png")}
							style={styles.fbImage}
							onPress={()=>this.login("google")}
						/>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	fbImage:{
		height: 30,
		width: 30,
		marginRight: 15,
		marginBottom: 5
	},
	footerParent: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 5,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	footer:{
		flexDirection: "row",
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: "center",
	},
	logo:{
		width: 200,
		height: 200
	},
	backgroundImage:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -100
	},
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
		paddingBottom: 10,
		zIndex:2
	},
	h3: {
		paddingBottom: 10,
		zIndex:1
	},
	buttonGroup: {
		padding: 20,
		marginTop: 40
	},
	loginFacebook: {
		marginBottom: 10
	},
	loginGuest: {
		marginBottom: 10,
		backgroundColor: "white",
		opacity: 0.85
	},
	loginAccountKit: {
		marginBottom:10,
		backgroundColor: 'white',
		width:250,
		opacity: 0.85
	},
	loginGoogle: {
		marginBottom: 10,
		backgroundColor: "#dd4b39"
	}
});
