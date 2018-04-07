import React from "react";
import { DrawerNavigator } from "react-navigation";

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import NewsScreen from "../screens/News";
import SettingsScreen from "../screens/Settings";
import MarketCapScreen from "../screens/MarketCap";
import PortfolioScreen from "../screens/Portfolio/Index";

// Components
import DrawerContent from "../components/DrawerContent";

export default DrawerNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Intro: {
			screen: IntroScreen
		},
		News: {
			screen: NewsScreen
		},
		Settings: { screen: SettingsScreen },
		Portfolio: { screen: PortfolioScreen },
		MarketCap: { screen: MarketCapScreen }
	},
	{
		initialRouteName: "Settings",
		navigationOptions: {
			header: null
		},
		contentComponent: props => <DrawerContent {...props} />
	}
);
