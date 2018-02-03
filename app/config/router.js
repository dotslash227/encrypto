import { StackNavigator } from 'react-navigation';

// Screens:
import HomeScreen from "../screens/Home";

export default StackNavigator({
  	Home: {
  	  screen: HomeScreen,
  	},
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
    	header: null
    }
  });