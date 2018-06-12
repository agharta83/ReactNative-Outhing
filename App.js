import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';

import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';
import LogoutScreen from './components/Logout';

import ProfilScreen from './components/Profil';
import NotifScreen from './components/PagesProfil/notifications';
import CalendarScreen from './components/PagesProfil/calendar';
import FriendsScreen from './components/PagesProfil/friends';

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

const AppStackNavigator = createStackNavigator(
  {
    Login:
    {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: { screen: SignUpScreen },
    Home: { screen: HomeScreen },
    Profil: ProfilScreen,
  },
  {
    initialRouteName: 'Profil',
  },
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Logout: { screen: LogoutScreen },
});

export default createSwitchNavigator(
  {
    App: AppDrawerNavigator,
    Auth: AppStackNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

const ProfilScreenTabNavigator = createBottomTabNavigator({
  Profil: {
    screen: ProfilScreen,
    navigationOptions: {
      tabBarLabel: 'Profil',
      tabBarIcon: () => (
        <FontAwesome name='user' size={24} />
      ),
    },
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarLabel: 'Agenda',
      tabBarIcon: () => (
        <FontAwesome name='calendar' size={24} />
      ),
    },
  },
  Notifications: {
    screen: NotifScreen,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: () => (
        <MaterialIcons name='notifications' size={24} />
      ),
    },
  },
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: () => (
        <FontAwesome name='group' size={24} />
      ),
    },
  },
});
