import React from "react";
import { DrawerNavigator } from 'react-navigation';

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import NewsScreen from "../screens/News";

// Components
import DrawerContent from "../components/DrawerContent";

export default DrawerNavigator({
  	Home: {
  	  screen: HomeScreen,
    },
    Intro: {
  	  screen: IntroScreen,
  	},
    News: {
      screen: NewsScreen,
    }
  },
  {
    initialRouteName: 'Intro',
    navigationOptions: {
    	header: null
    },
    contentComponent: props => <DrawerContent {...props} />
  });
