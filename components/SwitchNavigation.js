import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SignUpScreen from './Auth/SignUp';
import LoginScreen from './Auth/Login';
import WelcomeScreen from './Auth/Welcome';

import DrawerNav from './DrawerNav';
import MaterialBottomTabs from './ProfilScreenBottomTabs';

const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login:
      { screen: LoginScreen },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTintColor: '#e4e7ec',
      headerStyle: {
        backgroundColor: '#594192',
      },
    },
  },
});

const AppStack = createStackNavigator(
  {
    DrawerNav: {
      screen: DrawerNav,
      navigationOptions: {
        header: null,
      },
    },
    BottomTabs: {
      screen: MaterialBottomTabs,
    },
  },
  {
    initialRouteName: 'DrawerNav',
  },
);

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);
