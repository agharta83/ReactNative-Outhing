import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';

import HomeScreen from './components/Drawer/Home';
import SettingsScreen from './components/Drawer/Settings';
import LogoutScreen from './components/Drawer/Logout';

import DrawerNav from './components/DrawerNav';
import MaterialBottomTabs from './components/ProfilScreenBottomTabs';

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
};

const customTextProps = {
  style: {
    fontSize: 16,
    color: 'white',
  },
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

const AuthStack = createStackNavigator({
  Login:
      {
        screen: LoginScreen,
        navigationOptions: {
          header: null,
        },
      },
  SignUp: { screen: SignUpScreen },
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
