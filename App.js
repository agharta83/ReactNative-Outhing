import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import SwitchNavigator from './components/SwitchNavigation';


// TODO Change backgroundColor of StatusBas

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

export default class App extends Component {
  render() {
    return (
        <SwitchNavigator />
    );
  }
}
