import React, { Component } from 'react';
<<<<<<< HEAD
import { StyleSheet } from 'react-native';
=======
import { StyleSheet, View } from 'react-native';
>>>>>>> f73eb12a654ac4de882f9d087cb84cd79620dabe
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';


import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';
import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';
import LogoutScreen from './components/Logout';


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
<<<<<<< HEAD
    color: 'white',
  },
=======
    color: 'white'
  }
>>>>>>> f73eb12a654ac4de882f9d087cb84cd79620dabe
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f27cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const Nav = createDrawerNavigator({
<<<<<<< HEAD
  Home: HomeScreen,
  Settings: SettingsScreen,
  Logout: LogoutScreen,
});
=======
    Home: HomeScreen,
    Settings: SettingsScreen,
    Logout: LogoutScreen,
})
>>>>>>> f73eb12a654ac4de882f9d087cb84cd79620dabe

export default createSwitchNavigator(
  {
    App: Nav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },

);
