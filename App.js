import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import * as firebase from 'firebase';

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
  componentWillMount() {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyBn1_TVI38blzh0thZm7dl73DxnIhqMTRk',
      authDomain: 'outhing-13fcf.firebaseapp.com',
      databaseURL: 'https://outhing-13fcf.firebaseio.com',
      projectId: 'outhing-13fcf',
      storageBucket: 'outhing-13fcf.appspot.com',
      messagingSenderId: '782761547865',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  render() {
    return (
        <SwitchNavigator />
    );
  }
}
