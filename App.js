import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';
import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';

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
    color: 'white'
  }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

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
    Logout: LoginScreen,
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
