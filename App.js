import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';
import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';
import LogoutScreen from './components/Logout';


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
    Home: HomeScreen,
    Settings: SettingsScreen,
    Logout: LogoutScreen,
})

export default createSwitchNavigator(
  {
    App: Nav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },

);
