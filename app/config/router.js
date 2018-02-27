import { StackNavigator } from 'react-navigation';

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import NewsScreen from "../screens/News";

export default StackNavigator({
  	Home: {
  	  screen: HomeScreen,
    },
    Intro: {
  	  screen: IntroScreen,
  	},
    News: {
      screen: News,
    }
  },
  {
    initialRouteName: 'Intro',
    navigationOptions: {
    	header: null
    }
  });
