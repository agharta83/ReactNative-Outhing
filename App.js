import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Font } from 'expo';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import SignUpScreen from './components/Auth/SignUp';
import LoginScreen from './components/Auth/Login';
import HomeScreen from './components/Home';

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
    color: 'white',
    fontSize: 16,
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

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
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

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);
