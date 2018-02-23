import { StackNavigator } from 'react-navigation';

// Screens:
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";

export default StackNavigator({
  	Home: {
  	  screen: HomeScreen,
    },
    Intro: {
  	  screen: IntroScreen,
  	},
  },
  {
    initialRouteName: 'Intro',
    navigationOptions: {
    	header: null
    }
  });