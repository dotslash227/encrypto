import React from "react";
import { DrawerNavigator } from "react-navigation";

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import NewsScreen from "../screens/News";
import EventsScreen from "../screens/Events";
import ICOScreen from "../screens/ICO";
import SettingsScreen from "../screens/Settings";
import MarketCapScreen from "../screens/MarketCap";
import LoginScreen from "../screens/Login";
import PortfolioScreen from "../screens/Portfolio/Index";
import WatchlistScreen from "../screens/Watchlist/Index";
import AddToPortfolioScreen from "../screens/Portfolio/Add";
import TestScreen from "../screens/Test";

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
		News: { screen: RequiresConnection(NewsScreen, NoInternetText) },
		// Events: { screen: RequiresConnection(EventsScreen, NoInternetText) },
		Settings: { screen: SettingsScreen },
		Portfolio: {
			screen: RequiresConnection(PortfolioScreen, NoInternetText)
		},
		Watchlist: {
			screen: RequiresConnection(WatchlistScreen, NoInternetText)
		},
		AddToPortfolio: { screen: AddToPortfolioScreen },
		MarketCap: {
			screen: RequiresConnection(MarketCapScreen, NoInternetText)
		},
		Login: { screen: RequiresConnection(LoginScreen, NoInternetText) },
		ICO: { screen: RequiresConnection(ICOScreen, NoInternetText) },
		TestScreen: { screen: TestScreen },
	},
	{
		initialRouteName: "Intro",
		// initialRouteName: "MarketCap",
		navigationOptions: {
			header: null
		},
		contentComponent: props => <DrawerContent {...props} />
	}
);
