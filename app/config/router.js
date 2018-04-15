import React from "react";
import { DrawerNavigator } from "react-navigation";

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import NewsScreen from "../screens/News";
import SettingsScreen from "../screens/Settings";
import MarketCapScreen from "../screens/MarketCap";
import LoginScreen from "../screens/Login";
import PortfolioScreen from "../screens/Portfolio/Index";
import AddToPortfolioScreen from "../screens/Portfolio/Add";

// Components
import DrawerContent from "../components/DrawerContent";

// Internet Conn
import RequiresConnection from "react-native-offline-mode";
const NoInternetText =
	"Sorry, We couldn't connect to the network. Please check your Mobile Network or WiFi.";

export default DrawerNavigator(
	{
		Home: {
			screen: RequiresConnection(HomeScreen, NoInternetText)
		},
		Intro: {
			screen: IntroScreen
		},
		News: {
			screen: RequiresConnection(NewsScreen, NoInternetText)
		},
		Settings: { screen: SettingsScreen },
		Portfolio: { screen: RequiresConnection(PortfolioScreen, NoInternetText) },
		AddToPortfolio: { screen: AddToPortfolioScreen },
		MarketCap: { screen: RequiresConnection(MarketCapScreen, NoInternetText) },
		Login: { screen: RequiresConnection(LoginScreen, NoInternetText) }
	},
	{
		//initialRouteName: "Intro",
		initialRouteName: "Intro",
		navigationOptions: {
			header: null
		},
		contentComponent: props => <DrawerContent {...props} />
	}
);
